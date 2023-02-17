// React imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import YellowButton from "./components/YellowButton";
import Nav from "./components/Nav";

// CSS
import "./styles/ViewRequest.css";

function ViewRequest() {
	const request = JSON.parse(localStorage.getItem("request"))
	let navigate = useNavigate();

	const handleApply = () => {
		return navigate("/offer");
	  };

	  const handleGoBack = () => {
		return navigate("/home");
	  };

  return (
    <div className="viewRequest-container">
      <Nav />

      <div className="viewRequest-sub1">
		<h1>{request.taskName}</h1>
		<p>Requester: <span>{request.name}</span></p>
		<p>Age: <span> {request.age}</span></p>
		<p>Ethnicity: <span> {request.ethnicity}</span></p>
		<p>Gender: <span> {request.gender}</span></p>
		<p>Difficulty: <span> {request.difficulty}</span></p>
		<p >Description:</p>    
		<p id="description">{request.details}</p>   
      </div>

      <div className="viewRequest-buttons">
			<YellowButton onClick={handleGoBack}>Go Back</YellowButton>
			<YellowButton onClick={handleApply}>Apply</YellowButton>
	  </div>
     
    </div>
  );
}

export default ViewRequest;
