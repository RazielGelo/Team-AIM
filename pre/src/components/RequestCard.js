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
    onDeleteClick(email);
  };
}