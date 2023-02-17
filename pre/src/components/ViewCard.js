import React from 'react';
import { useNavigate } from 'react-router-dom';

import YellowButton from './YellowButton';

import "../styles/ViewCard.css";


function Card({ email, taskName, difficulty, details, onButtonClick }) {
  const navigate = useNavigate();

  const handleViewDetailsClick = () => {
    onButtonClick(email, taskName);
  };

  return (
    <div className="ViewCard">
      <h2>{taskName}</h2>
      <p>Difficulty: {difficulty}</p>
      <div className="details">
        <h3>Request Details:</h3>
        <p>{details}</p>
      </div>
      <YellowButton onClick={handleViewDetailsClick}>
        View
      </YellowButton>
    </div>
  );
}

export default Card;
