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
  const [location, setLocation] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const sessionEmail = JSON.parse(localStorage.getItem("session")).email;
  let navigate = useNavigate();

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const session = JSON.parse(localStorage.getItem("session")) || {};
    const user = accounts.find((account) => account.email === session.email);
    setfilteredRequest(user.requests);
    user.requests.forEach((request) => {
      setfilteredApplication(request.applications);
    });

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = (pos) => {
      const crd = pos.coords;

      setLocation({
        lat: crd.latitude,
        lng: crd.longitude,
      });
    };

    function error(err) {
      setErrorMessage(
        `ERROR(${err.code}): ${err.message}. Error getting your location`
      );
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  const handleShowApplications = (request) => {
    localStorage.setItem("selectedRequest", JSON.stringify(request));
    localStorage.setItem("applications", JSON.stringify(request.applications));
    return navigate("/applications");
  };

  const handleDeleteRequest = (request) => {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const session = JSON.parse(localStorage.getItem("session")) || {};
    const userIndex = accounts.findIndex(
      (account) => account.email === session.email
    );
    const user = accounts[userIndex];
    const requestIndex = user.requests.findIndex(
      (r) => r.taskName === request.taskName
    );
    user.requests.splice(requestIndex, 1);
    accounts[userIndex] = user;
    localStorage.setItem("accounts", JSON.stringify(accounts));
    setfilteredRequest([...user.requests]);
  };

  const handleDone = (request) => {
	const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
	const session = JSON.parse(localStorage.getItem("session")) || {};
	const userIndex = accounts.findIndex(
	  (account) => account.email === session.email
	);
	const user = accounts[userIndex];
	const requestIndex = user.requests.findIndex(
	  (r) => r.taskName === request.taskName
	);
	user.requests[requestIndex].status = "finished";
	accounts[userIndex] = user;
	localStorage.setItem("accounts", JSON.stringify(accounts));
	setfilteredRequest([...user.requests]);
  };

  const handleSetLocation = (request) => {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const session = JSON.parse(localStorage.getItem("session")) || {};
    const userIndex = accounts.findIndex(
      (account) => account.email === session.email
    );
    const user = accounts[userIndex];
    const requestIndex = user.requests.findIndex(
      (r) => r.taskName === request.taskName
    );

    user.requests[requestIndex].location = {
      lng: -122.950891, // replace with location.lng
      lat: 49.215401, // replace with location.lat
    };
    accounts[userIndex] = user;
    localStorage.setItem("accounts", JSON.stringify(accounts));
    setfilteredRequest([...user.requests]);
  };

  return (
    <div className="yourRequests-container">
      <Nav />

      <div className="yourRequests-sub1">
        <h1>YOUR REQUESTS</h1>
      </div>

      <div className="yourRequests-sub2">
        <div className="yourRequests-carousel">
          <Carousel>
            {filteredRequest
              .filter((request) => request.status !== "finished")
              .map((request, index) => (
                <RequestCard
                  key={sessionEmail + index}
                  email={sessionEmail}
                  taskName={request.taskName}
                  difficulty={request.difficulty}
                  details={request.details}
                  showApplicationsButton={
                    request.applications.length > 0 &&
                    request.status === "waiting"
                  }
                  showDeleteButton={request.status === "waiting"}
                  showDoneButton={request.status === "in-progress"}
                  showSetLocationButton={request.status === "in-progress"}
                  onApplicationsClick={() => handleShowApplications(request)}
                  onDeleteClick={() => handleDeleteRequest(request)}
                  onSetLocationClick={() => handleSetLocation(request)}
				  onDoneClick={() => handleDone(request)}
                />
              ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default YourRequests;
