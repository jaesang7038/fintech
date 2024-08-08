import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InitialPage.scss';

const InitialPage: React.FC = () => {
  const navigate = useNavigate();

  const handleDecision = (decision: string) => {
    if (decision === 'yes') {
      navigate('/select-destination');
    } else {
      navigate('/recommendation');
    }
  };

  return (
    <div className="app">
      <div className="form-container">
        <div className="form">
          <h2>여행지를 정하셨을까요?</h2>
          <div className="decision-buttons">
            <button onClick={() => handleDecision('yes')} className="decision-button">
              정했어요
            </button>
            <button onClick={() => handleDecision('no')} className="decision-button">
              아직요
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialPage;
