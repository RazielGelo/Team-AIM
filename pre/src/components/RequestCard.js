import React from "react";
import { useNavigate } from "react-router-dom";

import YellowButton from "./YellowButton";

import "../styles/RequestCard.css";

function RequestCard({
  email,
  taskName,
  difficulty,
  details,
  onDeleteClick,
  onApplicationsClick,
  onDoneClick,
  onSetLocationClick,
  showDeleteButton,
  showApplicationsButton,
  showDoneButton,
  showSetLocationButton,
}) {
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    onDeleteClick(email, taskName);
  };

  const handleShowApplicationsClick = () => {
    onApplicationsClick(email, taskName);
  };

  const handleDoneClick = () => {
    onDoneClick(email, taskName);
  };

  const handleSetLocationClick = () => {
    onSetLocationClick(email, taskName);
  };

  return (
    <div className="RequestCard">
      <h2>{taskName}</h2>
      <p>Difficulty: {difficulty}</p>
      <div className="details">
        <h3>Request Details:</h3>
        <p>{details}</p>
      </div>
      <div className="buttons">
        {showDeleteButton && (
          <YellowButton onClick={handleDeleteClick}>Delete</YellowButton>
        )}
        {showApplicationsButton && (
          <YellowButton onClick={handleShowApplicationsClick}>
            Applications
          </YellowButton>
        )}
        {showDoneButton && (
          <YellowButton onClick={handleDoneClick}>Done</YellowButton>
        )}
        {showSetLocationButton && (
          <YellowButton onClick={handleSetLocationClick}>Set Location</YellowButton>
        )}
      </div>
    </div>
  );
}

export default RequestCard;