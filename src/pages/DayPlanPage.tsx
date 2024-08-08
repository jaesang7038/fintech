import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import Slider from 'react-slick';
import './DayPlanPage.scss';
import { Plan, Schedule, useTravelStore } from '../store/store';
import { addDays, format } from 'date-fns';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactComponent as Airplane } from '../images/airplane.svg';
import { ReactComponent as Restaurant } from '../images/restaurant.svg';
import { ReactComponent as Accommodation } from '../images/accommodation.svg';
import { ReactComponent as Tourist } from '../images/tourist.svg';
import { azureService } from '../services/azureService';
import PlaceholderLoading from 'react-placeholder-loading'
import TempMap from './TempMAp';


const DayPlanPage: React.FC = () => {

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
        handleClickDay(1);
    }, []);

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
        console.log("id" + id);
        setSelectedDay(id);
    
        let tempPlanList = [...planList]; // 임시로 계획 목록을 복사합니다.
    
        await Promise.all(
            planList.map(async (p: Plan, index: number) => {
                console.log("pid" + p.id);
                if (p.id === id) {
                    const updatedSchedule: Schedule[] = await Promise.all(
                        p.schedule.map(async (s: Schedule) => {
                            console.log(s);
                            if (s.img) {
                                return s;
                            } else {
                                try {
                                    const img = await azureService.images(`${month}월의 ${s.engName}`);
                                    return {
                                        ...s,
                                        img
                                    };
                                } catch (error) {
                                    try {
                                        const img = await azureService.imagesAu(`${month}월의 ${s.engName}`, "Dalle3");
                                        return {
                                            ...s,
                                            img
                                        };
                                    } catch (e) {
                                        try {
                                            const img = await azureService.imagesAu(`${month}월의 ${s.engName}`, "Dalle3-2");
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
    
                    tempPlanList[index] = {
                        ...p,
                        schedule: updatedSchedule
                    };
    
                    // 각각의 계획이 업데이트될 때마다 임시 목록을 업데이트하고 화면을 갱신합니다.
                    setPlanList([...tempPlanList]);
                }
            })
        );
    
        // 모든 작업이 완료된 후 한 번 더 목록을 갱신하여 최종적으로 확정합니다.
        setPlanList([...tempPlanList]);
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
                    <TempMap></TempMap>
                </div>
                <div className="places-list">
                    {planList.filter(x => x.id === selectedDay)[0]?.schedule?.map((place, index) => (
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
