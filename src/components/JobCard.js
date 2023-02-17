import React from 'react';
import { useNavigate } from 'react-router-dom';

import YellowButton from './YellowButton';

import "../styles/JobCard.css";

function JobCard({ email, taskName, requester, age, gender, ethnicity, phonenumber, details, difficulty, onButtonClick }) {
  const navigate = useNavigate();

  const handleViewDetailsClick = () => {
    onButtonClick(email, taskName);
  };

  return (
    <div className="JobCard">
      <h2>{taskName}</h2>
	  <p>Requester: {requester}</p>
      <p>Age: {age}</p>
	  <p>Gender: {gender}</p>
	  <p>Ethnicity: {ethnicity}</p>
	  <p>Phonenumber: {phonenumber}</p>
	  <p>Difficulty: {difficulty}</p>
      <div className="details">
        <h3>Details:</h3>
        <p>{details}</p>
      </div>
      <YellowButton onClick={handleViewDetailsClick}>
        View
      </YellowButton>
    </div>
  );
}

export default JobCard;