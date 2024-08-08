import React, { useState } from 'react';
import './DestinationSelectionPage.scss';

const continents = ["아시아", "유럽", "북아메리카", "남아메리카"];
const countries: Record<string, string[]> = {
  "아시아": ["대한민국", "일본", "중국"],
  "유럽": ["프랑스", "영국", "독일"],
  "북아메리카": ["미국", "캐나다", "멕시코"],
  "남아메리카": ["브라질", "아르헨티나", "칠레"]
};
const cities: Record<string, string[]> = {
  "대한민국": ["서울", "부산", "제주"],
  "일본": ["도쿄", "오사카", "교토"],
  "중국": ["베이징", "상하이", "광저우"],
  "프랑스": ["파리", "리옹", "마르세유"],
  "영국": ["런던", "맨체스터", "에딘버러"],
  "독일": ["베를린", "뮌헨", "함부르크"],
  "미국": ["뉴욕", "로스앤젤레스", "시카고"],
  "캐나다": ["토론토", "밴쿠버", "몬트리올"],
  "멕시코": ["멕시코시티", "칸쿤", "과달라하라"],
  "브라질": ["리우데자네이루", "상파울루", "브라질리아"],
  "아르헨티나": ["부에노스아이레스", "코르도바", "로사리오"],
  "칠레": ["산티아고", "발파라이소", "푸콘"]
};

const DestinationSelectionPage: React.FC = () => {
  const [selectedContinent, setSelectedContinent] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const handleContinentSelect = (continent: string) => {
    setSelectedContinent(continent);
    setSelectedCountry("");
    setSelectedCity("");
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setSelectedCity("");
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <div className="app">
      <div className="form-container">
        <div className="form">
          <h2>여행할 나라와 도시를 선택하세요!</h2>
          <div className="continent-buttons">
            {continents.map((continent) => (
              <button
                key={continent}
                onClick={() => handleContinentSelect(continent)}
                className={`continent-button ${selectedContinent === continent ? 'selected' : ''}`}
              >
                {continent}
              </button>
            ))}
          </div>
          {selectedContinent && (
            <div className="country-buttons">
              {countries[selectedContinent]?.map((country) => (
                <button
                  key={country}
                  onClick={() => handleCountrySelect(country)}
                  className={`country-button ${selectedCountry === country ? 'selected' : ''}`}
                >
                  {country}
                </button>
              ))}
            </div>
          )}
          {selectedCountry && (
            <div className="city-buttons">
              {cities[selectedCountry]?.map((city) => (
                <button
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  className={`city-button ${selectedCity === city ? 'selected' : ''}`}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
          {selectedCity && (
            <div className="next-button-container">
              <button className="next-button" onClick={() => alert(`선택된 여행지: ${selectedContinent}, ${selectedCountry}, ${selectedCity}`)}>
                다음
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationSelectionPage;
