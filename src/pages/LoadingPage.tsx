import React, { useState, useEffect } from 'react';
import rakuten from '../images/logo_travel_01.svg';
import bonvoy from '../images/bonvoy.svg';
import shinhan from '../images/shinhan.svg';
import jewel from '../images/jewel.png';
import westin from '../images/westin.png';
import guam from '../images/guam.png';
import lotte from '../images/lotte.svg';
import outrigger from '../images/outrigger.png';
import seaLife from '../images/seaLife.png';
import trip from '../images/Trip.svg';
import visa from '../images/visa.svg';
import marriot from '../images/marriot.png';
import bicester from '../images/bicester.png';
import norwegian from '../images/norwegian.svg';
import trump from '../images/trump.svg';
import tangalooma from '../images/tangalooma.svg';
import lxr from '../images/lxr.png';
import './LoadingPage.scss';
import { Plan, Schedule, useTravelStore } from '../store/store';
import { azureService } from '../services/azureService';
import { useNavigate } from 'react-router-dom';
import { Collapse } from '@mui/material';


const LoadingPage: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [showNotice, setShowNotice] = useState(false);
  const navigate = useNavigate();
  const {
    gender,
    ageGroup,
    startDate,
    endDate,
    duration,
    month,
    city,
    country,
    planList,
    setPlanList
  } = useTravelStore();

  const eventList =
    [
      {
        "country": "일본",
        "eventList":
          [
            {
              "upperTxt": "신한 마스터 신용카드로",
              "title": "라쿠텐트래블 15% 할인",
              "img": rakuten
            },
            {
              "upperTxt": "메리어트 호텔 이용 시",
              "title": "최대 10만원 외식식사권!",
              "img": bonvoy
            },
            {
              "upperTxt": "테마파크/쇼핑몰/편의점까지!",
              "title": "일본 10% 캐시백",
              "img": shinhan
            },
          ]
      },
      {
        "country": "싱가포르",
        "eventList":
          [
            {
              "upperTxt": "메리어트 호텔 이용 시",
              "title": "최대 10만원 외식식사권!",
              "img": bonvoy
            },
            {
              "upperTxt": "싱가포르에서 신한카드 이용하면",
              "title": "10% 캐시백 & 항공권 경품이!",
              "img": shinhan
            },
            {
              "upperTxt": "싱가포르 창이 공항",
              "title": "바우처 제공",
              "img": jewel
            },
          ]
      },
      {
        "country": "괌",
        "eventList":
          [
            {
              "upperTxt": "웨스틴 리조트",
              "title": "객실 5% 할인",
              "img": westin
            },
            {
              "upperTxt": "고고 괌 페이",
              "title": "괌 최대 10만원 캐시백",
              "img": guam
            },
            {
              "upperTxt": "올 가을에 고고 괌!",
              "title": "괌 롯데면세점 $80 즉시할인",
              "img": lotte
            },
          ]
      },
      {
        "country": "하와이",
        "eventList":
          [
            {
              "upperTxt": "아웃리거리조트",
              "title": "객실 5% 할인",
              "img": outrigger
            },
            {
              "upperTxt": "오아후섬 해양 테마파크",
              "title": "씨라이프파크 15% 할인",
              "img": seaLife
            },
            {
              "upperTxt": "신한카드 X 트립닷컴",
              "title": "국내외 항공 4% 할인",
              "img": trip
            },
          ]
      },
      {
        "country": "동남아",
        "eventList":
          [
            {
              "upperTxt": "신한 Visa신용카드는!",
              "title": "빈펄 리조트 1+1박 2+2박",
              "img": visa
            },
            {
              "upperTxt": "아웃리거리조트",
              "title": "디너 3코스 2인 제공",
              "img": outrigger
            },
            {
              "upperTxt": "JW메리어트 푸꾸옥",
              "title": "객실 10% 할인",
              "img": marriot
            },
          ]
      },
      {
        "country": "유럽",
        "eventList":
          [
            {
              "upperTxt": "비스터 컬렉션",
              "title": "럭셔리 쇼핑 특별혜택",
              "img": bicester
            },
            {
              "upperTxt": "전세계를 운항하는 크루즈",
              "title": "NCL크루즈 $50 크레딧!",
              "img": norwegian
            },
            {
              "upperTxt": "신한카드 X 트립닷컴",
              "title": "국내외 항공 4% 할인",
              "img": trip
            },
          ]
      },
      {
        "country": "미국",
        "eventList":
          [
            {
              "upperTxt": "트럼프 호텔",
              "title": "객실 10% 할인",
              "img": trump
            },
            {
              "upperTxt": "LXR 호텔",
              "title": "객실 10% 할인",
              "img": lxr
            },
            {
              "upperTxt": "신한카드 X 트립닷컴",
              "title": "국내외 항공 4% 할인",
              "img": trip
            },
          ]
      },
      {
        "country": "호주",
        "eventList":
          [
            {
              "upperTxt": "탕갈루마 아이랜드",
              "title": "데이투어 10% 할인",
              "img": tangalooma
            },
            {
              "upperTxt": "신한카드 X 트립닷컴",
              "title": "국내외 항공 4% 할인",
              "img": trip
            },
          ]
      }
    ]
    ;

  useEffect(() => {
    // 처음에 애니메이션 텍스트를 보여주고, 1초 후에 상태를 변경
    setTimeout(() => {
      setShowNotice(true);
    }, 6000);

    const interval = setInterval(() => {
      if (showNotice) {
        setCurrentIndex(currentIndex => {
          const nextIndex = currentIndex + 1;
          if (nextIndex < eventList.length) {
            return nextIndex;
          } else {
            clearInterval(interval);
            return currentIndex;
          }
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [showNotice]);


  useEffect(() => {
    azureService.completions([{ role: "user", content: content }]).then(async (result) => {
      result = result.replaceAll("```json", "");
      result = result.replaceAll("```", "");
      console.log(result);
      console.log(typeof (result));
      let re = JSON.parse(result);

      setPlanList(re);

      await Promise.all(
        re.map(async (p: Plan, idx: number) => {
          if (idx === 0) {
            await Promise.all(
              p.schedule.map(async (s: Schedule) => {

                try {
                  const img = await azureService.images(`${s.engName}`);
                  s.img = img; // 이미지를 추가
                } catch (error) {
                  try {
                    const img = await azureService.imagesAu(`${s.engName}`, "Dalle3");
                    s.img = img; // 대체 이미지를 추가
                  } catch (e) {
                    try {
                      const img = await azureService.imagesAu(`${s.engName}`, "Dalle3-2");
                      s.img = img; // 대체 이미지를 추가
                    } catch (e2) {

                    }
                  }
                }
              })
            );
          }
        })
      );

      setPlanList([...re]);


      navigate('/day-plan');
    })
  }, []);


  const content =
    `
        아래와 같은 정보로 여행을 계획중이야.
        출발지는 한국 - 인천공항이야.

        <data>
        - 성별 : ${gender}
        - 나이 : ${ageGroup}대, 
        - 여행기간 : ${duration}박 ${duration + 1}일
        - 여행 월 : ${month}월
        - 여행 도시 : ${city}
        - 여행 나라 : ${country}
        - 출발지: 대한민국 - 인천공항
        </data>

        응답은 <example>과 동일한 포맷으로 반환해.
        응답에는 JSON 이외의 문자열이 있으면 안돼. 응답을 json.parser() 로 사용할거니까 한번더 확인해.

        관광지나 위주의 장소로 type을 추가해서 알려줘. (tourist)
        구체적 대명사로 알려줘.
        distance_spent는 이전 장소에서 현재 장소까지의 거리를 알려줘.
        하루 당 일정은 4개 이하로 잡아줘
        Dalle-e-3에서 rejected 되지않게 engName 생성해줘!
        schedule의 lat,lng로 google map api으로 Directions Service를 호출할거야. 
        경도, 위도를 한번 더 검토해서 정확하게 리턴해줘.
        시간순으로 일정을 만들어줘. 여행기간 : ${duration}박 ${duration + 1}일의 전체일정이 반드시 필요해.

        <example> 
        [
           {
              "id": 1,
              "description": "1일차",
              "schedule": [
                  {
                      "name": "산 마르코 광장",
                      "engName": "Piazza San Marco",
                      "description": "베네치아의 중심지로, 성 마르코 대성당과 두칼레 궁전이 위치하고 있습니다.",
                      "lat": 45.4372,
                      "lng": 12.3353,
                      "type": "tourist"
                  },
                  {
                      "name": "누오바 다리아 모레 대교",
                      "engName": "Ponte della Costituzione",
                      "description": "베네치아의 현대적인 다리로, 독특한 설계와 아름다운 풍경을 감상할 수 있습니다.",
                      "lat": 45.4395,
                      "lng": 12.3246,
                      "type": "tourist",
                      "distance_spent": "1km",
                  },
                  {
                      "name": "리알토 다리",
                      "engName": "Rialto Bridge",
                      "description": "베네치아 가장 오래된 다리로, 상점과 많은 관광객들로 항상 붐빕니다.",
                      "lat": 45.4380,
                      "lng": 12.3352,
                      "type": "tourist",
                      "distance_spent": "5km",
                  }
              ]
          },
          {
              "id": 2,
              "description": "2일차",
              "schedule": [
                  {
                      "name": "무라노 섬",
                      "engName": "Murano Island",
                      "description": "유리 제조로 유명한 섬으로, 다양한 유리 작품을 감상할 수 있습니다.",
                      "lat": 45.4500,
                      "lng": 12.3600,
                      "type": "tourist",
                  },
                  {
                      "name": "부라노 섬",
                      "engName": "Burano Island",
                      "description": "다채로운 집들이 있는 아름다운 섬으로, 레이스 공예로 유명합니다.",
                      "lat": 45.2500,
                      "lng": 12.4252,
                      "type": "tourist",
                      "distance_spent": "30km",
                  },
                  {
                      "name": "대운하",
                      "engName": "Grand Canal",
                      "description": "베네치아의 주요 수로로, 곤돌라 타기와 아름다운 경치를 즐길 수 있습니다.",
                      "lat": 45.4332,
                      "lng": 12.3373,
                      "type": "tourist",
                      "distance_spent": "2km",
                  }
              ]
          },
          {
              "id": 3,
              "description": "3일차",
              "schedule": [
                  {
                      "name": "성 마르코 대성당",
                      "engName": "Basilica di San Marco",
                      "description": "화려한 모자이크와 건축 양식으로 유명한 대성당입니다.",
                      "lat": 45.4344,
                      "lng": 12.3398,
                      "type": "tourist",
                  },
                  {
                      "name": "두칼레 궁전",
                      "engName": "Palazzo Ducale",
                      "description": "베네치아의 역사적 건축물로, 고풍스러운 예술작품이 전시되어 있습니다.",
                      "lat": 45.4333,
                      "lng": 12.3350,
                      "type": "tourist",
                      "distance_spent": "0.5km",
                  },
                  {
                      "name": "아카데미 미술관",
                      "engName": "Gallerie dell'Accademia",
                      "description": "벨기에, 이탈리아 등 유명 화가들의 작품을 소장하고 있는 미술관입니다.",
                      "lat": 45.4330,
                      "lng": 12.3282,
                      "type": "tourist",
                      "distance_spent": "0.5km",
                  }
              ]
          }
         ]
              
     </example> 
      Unconditionally return in JSON format. No other strings should be present.
      name은 정확한 명칭만 사용해. (인천공항, 나리타 공항 등, 나리타 공항 도착등으로 사용하지마)
      Dalle-e-3에서 rejected 되지않게 engName 생성해줘!
      schedule의 lat,lng로 google map api으로 Directions Service를 호출할거야. 
      MapsRequestError: DIRECTIONS_ROUTE: ZERO_RESULTS: No route could be found between the origin and destination.가 안뜨는 경로로 추천해.
      시간순으로 일정을 만들어줘. 여행기간 : ${duration}박 ${duration + 1}일의 전체일정이 반드시 필요해.
      경도, 위도가 반드시 바다 한가운데 있지 않게 해야해.
      예를 들어 Arashiyama Bamboo Grove의 위치는 35.009392, 135.667007 야.
                     
    `;


  return (
    <div id="loading" className="app">
      <div className="form-container">
        <div className="form">
          <div className="loading-wrap">
            <section className="wrapper">
              <div className="spinner">
                <i></i><i></i><i></i><i></i><i></i><i></i><i></i>
              </div>
            </section>
            <div className="header">
              <h1 className='animated-text'>여행 일정을 생성 중입니다</h1>
            </div>
          </div>
          <div className='sol-event-wrap'>
            <p className="notice" style={{ opacity: showNotice ? 1 : 0, transition: 'opacity 1s' }}>SOL트래블⁺ 추천 혜택</p>
            {eventList[0].eventList.map((event, index) => (
              <Collapse in={index <= currentIndex} timeout={500} key={index}>
                <div className='sol-event-list'>
                  <div className='img-wrap'>
                    <img className="company-img" src={event.img} alt={event.title} />
                  </div>
                  <div className='sol-event'>
                    <p className='grey-txt'>{event.upperTxt}</p>
                    <p className='title'>{event.title}</p>
                  </div>
                </div>
              </Collapse>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
