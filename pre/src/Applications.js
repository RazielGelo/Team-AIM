// React imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Nav from "./components/Nav";
import Carousel from "./components/Carousel";
import CompanionCard from "./components/CompanionCard";

// CSS
import "./styles/Applications.css";

function Applications() {
  const applications = JSON.parse(localStorage.getItem("applications")) || [];
  const selectedRequest = JSON.parse(localStorage.getItem("selectedRequest"));
  const [location, setLocation] = useState();
  const [errorMessage, setErrorMessage] = useState("");


  let navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    if (!session) {
      return navigate("/");
    }

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

  const handleAcceptClick = (application) => {
    const session = JSON.parse(localStorage.getItem("session")) || {};
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    const updatedApplication = { ...application, status: "accepted" };
    const filteredApplications = applications.filter(
      (a) => a.companionEmail !== updatedApplication.companionEmail
    );
    filteredApplications.push(updatedApplication);
    localStorage.setItem("applications", JSON.stringify(filteredApplications));

    const user = accounts.find((account) => account.email === session.email);
    const userRequest = user.requests.find(
      (r) => r.taskName === selectedRequest.taskName
    );
    userRequest.status = "in-progress";

    const filteredAccounts = accounts.filter(
      (account) => account.email !== session.email
    );
    const updatedUser = {
      ...user,
      requests: user.requests.map((request) =>
        request.taskName === selectedRequest.taskName
          ? {
              ...request,
              status: "in-progress",
              applications: [
                ...(request.applications || []).filter(
                  (a) => a.companionEmail !== updatedApplication.companionEmail
                ),
                updatedApplication,
              ],
			  location: {
				lng: -122.950891, // location.lng
				lat: 49.215401, // location.lat
			  }
            }
          : request
      ),
    };
    filteredAccounts.push(updatedUser);
    localStorage.setItem("accounts", JSON.stringify(filteredAccounts));
    localStorage.setItem("session", JSON.stringify(updatedUser));
    return navigate("/yourrequests");
  };

  return (
    <div className="applications-container">
      <Nav />

      <div className="applications-sub1">
        <h1>Applications - {selectedRequest.taskName}</h1>
      </div>

      <div className="applications-sub2">
        <div className="applications-carousel">
          <Carousel>
            {applications
              .filter((application) => application.status === "waiting")
              .map((application, index) => (
                <CompanionCard
                  key={application.companionEmail + index}
                  email={application.companionEmail}
                  name={application.companionName}
                  age={application.companionAge}
                  ethnicity={application.companionEthnicity}
                  gender={application.companionGender}
                  phonenumber={application.companionPhone}
                  fee={application.fee}
                  description={application.description}
                  onButtonClick={() => handleAcceptClick(application)}
                />
              ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Applications;
