import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import Slider from 'react-slick';
import './DayPlanPage.scss';
import { Plan, Schedule, useTravelStore } from '../store/store';
import { addDays, format } from 'date-fns';
import CustomMap from '../components/CustomMap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DirectionMap from '../components/DirectionMap';
import VisMap from '../components/VisMap';
import { ReactComponent as Airplane } from '../images/airplane.svg';
import { ReactComponent as Restaurant } from '../images/restaurant.svg';
import { ReactComponent as Accommodation } from '../images/accommodation.svg';
import { ReactComponent as Tourist } from '../images/tourist.svg';
import { azureService } from '../services/azureService';
import PlaceholderLoading from 'react-placeholder-loading'
import TempMap from './TempMAp';


const DayPlanPage: React.FC = () => {
    const location = useLocation();

    const {
        startDate,
        duration,
        month,
        city,
        country,
        planList,
        selectedDay,
        setPlanList,
        setMapInfo,
        setSelectedDay
    } = useTravelStore();

    useEffect(() => {
        setSelectedDay(1);
    },[]);

    useEffect(() => {
        const plan = planList.filter((x) => x.id === selectedDay);

        if (plan.length > 0) {
            const mapInfo = plan[0].schedule.map((s) => {
                const ret = {
                    ...s
                };

                return ret;
            });

            setMapInfo(mapInfo);
        }
    }, [selectedDay]);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        variableWidth: true,
        afterChange: (index: number) => setSelectedDay(index + 1),
        nextArrow: <button className="carousel-button right">&#9654;</button>,
        prevArrow: <button className="carousel-button left">&#9664;</button>,
    };

    const handleClickDay = async (id: number) => {
        console.log(id);
        setSelectedDay(id);

        const updatedPlanList = await Promise.all(
            planList.map(async (p: Plan) => {
                if (p.id === id) {
                    const updatedSchedule: Schedule[] = await Promise.all(
                        p.schedule.map(async (s: Schedule) => {
                        return s;
                            if (s.img) {
                                return s;
                            } else {
                                try {
                                    const img = await azureService.images(`${s.engName}`);
                                    return {
                                        ...s,
                                        img
                                    };
                                } catch (error) {
                                    try {
                                        const img = await azureService.imagesAu(`${s.engName}`,"Dalle3");
                                        return {
                                            ...s,
                                            img
                                        };
                                    } catch (e) {
                                        try {
                                            const img = await azureService.imagesAu(`${s.engName}`,"Dalle3-2");
                                            return {
                                                ...s,
                                                img
                                            };
                                        } catch (e) {
                                            return s;
                                        }
                                    }
                                }
                            }
                        })
                    );
                    return {
                        ...p,
                        schedule: updatedSchedule
                    };
                } else {
                    return p;
                }
            })
        );

        setPlanList(updatedPlanList);
    }

    return (
        <div id="day-plan" className="app">
            <div className="form-container">
                <div className="header">
                    <h1>{city}, {country}</h1>
                    <p>{`${month}월, ${duration}박 ${duration + 1}일 동안의 여행 일정`}</p>
                </div>
                <Slider {...settings} className="day-selector">
                    {planList.map(plan => (
                        <button key={plan.id} className={`day-button ${selectedDay === plan.id ? 'selected' : ''}`} onClick={() => { handleClickDay(plan.id) }}>
                            <p>{format(addDays(startDate, plan.id), 'MM월')}</p>
                            <p>{format(addDays(startDate, plan.id), 'dd일')}</p>
                        </button>
                    ))}
                </Slider>
                <div className="map-container">
                    {/* <LoadScript googleMapsApiKey={"AIzaSyA_00X2sLpP6XCdmtmKaPI7RKd8u7GbPVc"}>
                        <CustomMap />
                    </LoadScript> */}
                    {/* <DirectionMap></DirectionMap> */}
                    {/* <VisMap></VisMap> */}
                    <TempMap></TempMap>
                </div>
                <div className="places-list">
                    {planList.filter(x => x.id === selectedDay)[0].schedule.map((place, index) => (
                        <div key={index} className="place-item" data-distance={place.distance_spent}>
                            <div className={`icon ${place.type}`} data-index={index + 1}>
                                {place.type === 'airport' && <Airplane></Airplane>}
                                {place.type === 'restaurant' && <Restaurant></Restaurant>}
                                {place.type === 'accommodation' && <Accommodation></Accommodation>}
                                {place.type === 'tourist' && <Tourist></Tourist>}
                            </div>
                            <div className="content">
                                <div className="image">
                                    {place.img && (<img src={place.img} alt={place.name} />)}
                                    {!place.img && (<PlaceholderLoading shape="rect" width={150} height={150} />)}
                                    
                                    
                                </div>
                                <div className="text">
                                    <div className="name">{place.name}</div>
                                    <div className="description">{place.description}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DayPlanPage;
