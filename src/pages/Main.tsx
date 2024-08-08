import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Collapse } from '@mui/material';
import { ReactComponent as FemaleIcon } from '../images/female.svg';
import { ReactComponent as MaleIcon } from '../images/male.svg';
import './Main.scss';
import { useTravelStore } from '../store/store';

const Main: React.FC = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useTravelStore((state) => [state.gender, state.setGender]);
  const [ageGroup, setAgeGroup] = useTravelStore((state) => [state.ageGroup, state.setAgeGroup]);


  const handleGenderChange = (selectedGender: string) => {
    if (gender === selectedGender) {
      setGender('');
      setAgeGroup('');
    } else {
      setGender(selectedGender);
      setAgeGroup(''); // 성별이 변경되면 연령대 선택 초기화
    }
  };

  const handleAgeGroupChange = (selectedAgeGroup: string) => {
    if (ageGroup === selectedAgeGroup) {
      setAgeGroup('');
    } else {
      setAgeGroup(selectedAgeGroup);
    }
  };

  const handleNext = () => {
    navigate('/next');
  };

  const ageGroups = ['10대', '20대', '30대', '40대', '50대', '60+'];
  const genders = [
    { label: '남성', icon: MaleIcon },
    { label: '여성', icon: FemaleIcon },
  ];

  return (
    <div id="main" className="app">
      <div className="form-container">
        <div className="header">
          <h1>SOL 트래블 <br />체크카드와 함께라면 <br />어디든 갈 수 있어!</h1>
          <p>
            여행 갈 준비 됐어?<br />
            간단한 정보로 특별한 순간을 만들어봐!
          </p>
        </div>
        <div className="form">
          <div className="gender-buttons">
            {genders.map((genderItem) => {
              const IconComponent = genderItem.icon;
              return (
                <button
                  key={genderItem.label}
                  onClick={() => handleGenderChange(genderItem.label)}
                  className={`gender-button ${gender === genderItem.label ? 'selected' : ''}`}
                >
                  <div className="button-content">
                    <span>{genderItem.label}</span>
                    <IconComponent className="gender-icon" fill='#000000' />
                    {gender === genderItem.label && (
                      <svg
                        className="check-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#005bac"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          <Collapse in={!!gender}>
            <div className="age-group-buttons">
              {ageGroups.map((group) => (
                <button
                  key={group}
                  onClick={() => handleAgeGroupChange(group)}
                  className={`age-group-button ${ageGroup === group ? 'selected' : ''}`}
                >
                  {group}
                </button>
              ))}
            </div>
          </Collapse>
          <Collapse in={!!gender && !!ageGroup}>
            <div className="next-button-container">
              <button className="next-button" onClick={handleNext}>다음</button>
            </div>          
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default Main;
