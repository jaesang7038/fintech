import React, { useState, useEffect } from 'react';
import { Plan, Schedule, useTravelStore } from '../store/store';
import Slider from 'react-slick';
import { Collapse } from '@mui/material';
import './RecommendationPage.scss';
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import { azureService } from '../services/azureService';
import { useNavigate } from 'react-router-dom';
import PlaceholderLoading from 'react-placeholder-loading';
import * as _ from "lodash";


// const recommendations = [
//   {
//     country: "대한민국",
//     city: "서울",
//     description: "서울은 대한민국의 수도로, 다양한 역사적 명소와 현대적 매력을 갖추고 있습니다.",
//     imageUrl: '/images/seoul.jpeg'
//   },
//   {
//     country: "일본",
//     city: "도쿄",
//     description: "도쿄는 일본의 수도로, 다양한 문화와 맛있는 음식을 즐길 수 있습니다.",
//     imageUrl: '/images/tokyo.jpeg'
//   },
//   {
//     country: "미국",
//     city: "뉴욕",
//     description: "뉴욕은 미국의 대표적인 도시로, 다양한 엔터테인먼트와 관광 명소를 제공합니다.",
//     imageUrl: '/images/newyork.jpeg'
//   },
//   {
//     country: "영국",
//     city: "런던",
//     description: "런던은 영국의 수도로, 다양한 문화와 역사적 명소를 제공합니다.",
//     imageUrl: '/images/london.jpeg'
//   },
// ];
interface recommendationInf {
  country: string;
  city: string;
  engName: string;
  description: string;
  engDescription: string;
  img?: string;
}

const RecommendationPage: React.FC = () => {
  const navigate = useNavigate();
  const { duration, month } = useTravelStore((state) => ({
    duration: state.duration,
    month: state.month,
  }));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const [showSubTitle, setShowSubTitle] = useState(false);
  const [recommendations, setRecommendations] = useState<recommendationInf[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const {
    gender,
    ageGroup,
    startDate,
    endDate,
  } = useTravelStore();

  const [city, setCity] = useTravelStore((state) => [state.city, state.setCity]);
  const [country, setCountry] = useTravelStore((state) => [state.country, state.setCountry]);
  const [planList, setPlanList] = useTravelStore((state) => [state.planList, state.setPlanList]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSubTitle(true);
    }, 4000); // 1초 후에 애니메이션 시작

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showSubTitle) {
      const timer = setTimeout(() => {
        setShowRecommendations(true);
      }, 5000); // 1초 후에 애니메이션 시작

      return () => clearTimeout(timer);
    }
  }, [showSubTitle]);

  useEffect(() => {
    const content = `
       아래와 같은 정보로 여행을 계획중이야. 
       아래 정보에 추천할만한 여행갈 나라 및 도시 추천해줘.
       출발은 대한민국 인천공항에서 할거야. 일정을 생각해서 추천해줘.

       <data>
       - 성별 : ${gender}
       - 나이 : ${ageGroup}대, 
       - 여행기간 : ${duration}박 ${duration + 1}일
       - 여행 월 : ${month}월
       - 출발지: 대한민국 - 인천공항
       </data>

       응답은 <example>과 동일한 포맷으로 반환해.
       응답에는 JSON 이외의 문자열이 있으면 안돼. 응답을 json.parser() 로 사용할거니까 한번더 확인해.
       총 최대 3개 도시까지만 추천해줘. 동일 나라에 관광지는 최대 2개까지만 제공해줘.
       한국은 제외해.
       Dalle-e-3에서 rejected 되지않게 engName, engDescription생성해!
       


       <example> 
       [
       {
         country: "한국",
         city: "서울",
         engName: "Seoul of South Korean"
         description: "서울은 대한민국의 수도로, 다양한 역사적 명소와 현대적 매력을 갖추고 있습니다.",
         engDescription: "Seoul is the capital of South Korea, with a variety of historical and modern attractions."
       },
       {
         country: "일본",
         city: "도쿄",
         engName: "Tokyo of Japan"
         description: "도쿄는 일본의 수도로, 다양한 문화와 맛있는 음식을 즐길 수 있습니다.",
         engDescription: "Tokyo is the capital city of Japan, home to a diverse culture and delicious food."
       }
       ]
       </example> 
       총 최대 4개 도시까지만 추천해줘.
    `

    azureService.completions([{ role: "user", content: content }])
      .then(async(result) => {
        result = result.replaceAll("```json", "");
        result = result.replaceAll("```", "");
        const parsedResult: recommendationInf[] = JSON.parse(result);
        setRecommendations(parsedResult);
        let newResult = parsedResult;
        console.log(parsedResult);
        await Promise.all(
          parsedResult.map(async (r: recommendationInf, idx: number) => {            
            try {
              const img = await azureService.images(`${month}월의 City : ${r.engName}   , description : ${r.engDescription}`);
              r.img = img; // 이미지를 추가
              newResult = parsedResult.map((x,i)=> {
                if(i !== idx)
                  return x;
                else {
                  return r;
                }
              })
            } catch (error) {
              try {
                const img = await azureService.imagesAu(`${month}월의 City : ${r.engName}   , description : ${r.engDescription}`,"Dalle3");
                r.img = img; // 대체 이미지를 추가
                newResult = parsedResult.map((x,i)=> {
                  if(i !== idx)
                    return x;
                  else {
                    return r;
                  }
                })
                setRecommendations([...newResult]);
              } catch (e) {

              }
            }
          })
        );
        console.log(parsedResult);
        setRecommendations([...parsedResult]);
        
      });

  }, [])

  return (
    <div className="app">
      <div className="form-container">
        <div className="header">
          <Collapse in={true}>
            <h1 className='animated-text'>어디로 떠나고 싶으세요?</h1>
          </Collapse>
          <Collapse in={showSubTitle}>
            <p className="sub-text">{`${month}월, ${duration}박 ${duration + 1}일 동안 가기 좋은 여행지를 추천합니다.`}</p>
          </Collapse>
        </div>
        <Collapse in={showRecommendations}>
          <div className="form">
          {_.isEmpty(recommendations)  && (               
                  <div className="recommendation-card">
                  <PlaceholderLoading shape="rect" width={350} height={350}  />
                  <div className='br' />
                  <PlaceholderLoading shape="rect" width={100} height={29}  />
                  <div className='br' />
                  <PlaceholderLoading shape="rect" width={300} height={50}  />
                  <div className='br' />
                  <PlaceholderLoading shape="rect" width={350} height={35}  />
                </div>
              )}
      
        {!_.isEmpty(recommendations) &&(
            <Slider  {...settings}>
              
              {  recommendations.map((recommendation, index) => (
                <div key={index} className="recommendation-card">
                  {!recommendation.img && (<PlaceholderLoading shape="rect" width={350} height={350}  />)}
                  {recommendation.img && (<img src={recommendation.img} alt={recommendation.city} className="recommendation-image" />)}
                  
                  <h2>{recommendation.country} - {recommendation.city}</h2>
                  <p>{recommendation.description}</p>
                  <button className="select-button" onClick={async () => {
                    setCity(recommendation.city);
                    setCountry(recommendation.country);

                    navigate('/loading');

                  }}>
                    선택
                  </button>
                </div>
              ))}
            </Slider>
            )}
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default RecommendationPage;


