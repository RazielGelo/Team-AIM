import React from 'react';
import { useNavigate } from 'react-router-dom';

import YellowButton from './YellowButton';

import "../styles/CompanionCard.css";


function CompanionCard({ email, name, age, ethnicity, phonenumber, description, fee, onButtonClick }) {
  const navigate = useNavigate();

  const handleAcceptClick = () => {
    onButtonClick(email);
  };

  return (
    <div className="CompanionCard">
      <h2>{name}</h2>
      <p>Age: {age}</p>
	  <p>Ethnicity: {ethnicity}</p>
	  <p>Phonenumber: {phonenumber}</p>
	  <p>Fee: {fee}</p>
      <div className="details">
        <h3>Description:</h3>
        <p>{description}</p>
      </div>
      <YellowButton onClick={handleAcceptClick}>
        Accept
      </YellowButton>
    </div>
  );
}

export default CompanionCard;
