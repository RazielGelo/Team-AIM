// React imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Nav from "./components/Nav";
import Carousel from "./components/Carousel";
import RequestCard from "./components/RequestCard";

// CSS
import "./styles/YourRequests.css";

function YourRequests() {
  const [filteredRequest, setfilteredRequest] = useState([]);
  const [filteredApplication, setfilteredApplication] = useState([]);
  const sessionEmail = JSON.parse(localStorage.getItem("session")).email;

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const session = JSON.parse(localStorage.getItem("session")) || {};
    const user = accounts.find((account) => account.email === session.email);
    setfilteredRequest(user.requests);
    user.requests.forEach((request) => {
      setfilteredApplication(request.applications)
    })
  }, []);

  return (
    <div className="yourRequests-container">
      <Nav />

      <div className="yourRequests-sub1">
        <h1>YOUR REQUESTS</h1>
      </div>

      <div className="yourRequests-sub2">
        <div className="yourRequests-carousel">
          <Carousel>
            {filteredRequest.map((request, index) => (
              <RequestCard
                key={sessionEmail + index}
                email={sessionEmail}
                taskName={request.taskName}
                difficulty={request.difficulty}
                details={request.details}
                showApplicationsButton={filteredApplication.length > 0}
                showDeleteButton={request.status === "waiting"}
                showDoneButton={request.status === "in-progress"}
                showSetLocationButton={request.status === "in-progress"}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default YourRequests;

