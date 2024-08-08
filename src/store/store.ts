import create from 'zustand';


export interface Schedule {
    name: string;
    engName: string;
    description: string;
    lat: number;
    lng: number;
    type: string;
    distance_spent?: string;
    img?: string;
}

export interface Plan {
    id: number;
    description: string;
    schedule: Schedule[];
}

interface TravelState {
    gender: string;
    ageGroup: string;
    startDate: Date;
    endDate: Date;
    duration: number;
    month: string;
    city: string;
    country: string;
    planList: Plan[];
    mapInfo: Schedule[];
    selectedDay: number;
    setGender: (gender: string) => void;
    setAgeGroup: (ageGroup: string) => void;
    setStartDate: (startDate: Date) => void;
    setEndDate: (endDate: Date) => void;
    setDuration: (duration: number) => void;
    setMonth: (month: string) => void;
    setCity: (city: string) => void;
    setCountry: (country: string) => void;
    setPlanList: (list: Plan[]) => void;
    setMapInfo: (mapInfo: Schedule[]) => void;
    setSelectedDay: (selectedDay: number) => void;
}

export const useTravelStore = create<TravelState>((set) => ({
    gender: '',
    ageGroup: '',
    startDate: new Date(),
    endDate: new Date(),
    duration: 0,
    month: '',
    city: '',
    country: '',
    planList:
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
                    "type": "tourist",
            
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
                    "distance_spent": "1km",
            
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
                    "type": "tourist"
            
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
                    "distance_spent": "1km",
            
                }
            ]
        },
        {
            "id": 4,
            "description": "4일차",
            "schedule": [
                {
                    "name": "카 도로 대학교",
                    "engName": "Ca' Foscari University",
                    "description": "이탈리아에서 가장 오래된 대학 중 하나로, 아름다운 건축물을 간직하고 있습니다.",
                    "lat": 45.4385,
                    "lng": 12.3252,
                    "type": "tourist",
            
                },
                {
                    "name": "엘레판테",
                    "engName": "Elephant",
                    "description": "베네치아의 상징적인 조형물과 함께 독특한 사진을 남길 수 있는 장소입니다.",
                    "lat": 45.4312,
                    "lng": 12.3394,
                    "type": "tourist",
                    "distance_spent": "1.5km",
            
                },
                {
                    "name": "와이너리 투어",
                    "engName": "Winery Tour",
                    "description": "베네토 지역의 와인을 시음할 수 있는 투어를 통해 이탈리아 와인의 세계를 경험할 수 있습니다.",
                    "lat": 45.4019,
                    "lng": 12.8944,
                    "type": "tourist",
                    "distance_spent": "30km",
            
                }
            ]
        },
        {
            "id": 5,
            "description": "5일차",
            "schedule": [
                {
                    "name": "페라리 박물관",
                    "engName": "Ferrari Museum",
                    "description": "페라리의 역사와 명품 스포츠카들을 전시하고 있는 박물관입니다.",
                    "lat": 44.4165,
                    "lng": 10.4607,
                    "type": "tourist",
            
                },
                {
                    "name": "베로나",
                    "engName": "Verona",
                    "description": "로미오와 줄리엣의 도시로 유명한 역사적인 도시입니다.",
                    "lat": 45.4382,
                    "lng": 10.9929,
                    "type": "tourist",
                    "distance_spent": "40km",
            
                },
                {
                    "name": "줄리엣의 집",
                    "engName": "Juliet's House",
                    "description": "셰익스피어의 '로미오와 줄리엣'에 등장하는 줄리엣의 집을 방문할 수 있습니다.",
                    "lat": 45.4420,
                    "lng": 10.9994,
                    "type": "tourist",
                    "distance_spent": "1km",
            
                }
            ]
        }
    ]


    ,
    mapInfo: [],
    selectedDay: 1,
    setGender: (gender) => set({ gender }),
    setAgeGroup: (ageGroup) => set({ ageGroup }),
    setStartDate: (startDate) => set({ startDate }),
    setEndDate: (endDate) => set({ endDate }),
    setDuration: (duration) => set({ duration }),
    setMonth: (month) => set({ month }),
    setCity: (city) => set({ city }),
    setCountry: (country) => set({ country }),
    setPlanList: (planList) => set({ planList }),
    setMapInfo: (mapInfo) => set({ mapInfo }),
    setSelectedDay: (selectedDay) => set({ selectedDay }),
}));
