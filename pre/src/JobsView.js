// React imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { mapbox_token } from "./constants";

//https://popupsmart.com/blog/react-popup
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

// Components
import YellowButton from "./components/YellowButton";
import Nav from "./components/Nav";

// CSS
import "./styles/JobsView.css";

function JobsView() {
  const request = JSON.parse(localStorage.getItem("request"));
  const [startLocation, setstartLocation] = useState();
  const [geocodeResult, setGeocodeResult] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  // useEffect to get user current location then set location to be saved in database
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    if (!session) {
      return navigate("/");
    }

    // options parameter for currentPosition function
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    // Success parameter for currentPosition function
    const success = (pos) => {
      // access position coordinates
      const crd = pos.coords;

      setstartLocation({
        lat: crd.latitude,
        lng: crd.longitude,
      });
    };

    // Error parameter for currentPosition function
    function error(err) {
      setErrorMessage(
        `ERROR(${err.code}): ${err.message}. Error getting your location`
      );
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  // Function to handle get direction click event
  async function getDirectionsClicked() {
    if (startLocation) {
      // fetch mapbox api using directions services
      try {
        const endpoint = `https://api.mapbox.com/directions/v5/mapbox/driving/${startLocation.lng},${startLocation.lat};${request.location.lng},${request.location.lat}?steps=true&geometries=geojson&access_token=${mapbox_token}`;

        await axios.get(endpoint).then(({ data }) => {
          setGeocodeResult(data);
        });
      } catch {
        setErrorMessage("Error getting directions, please try again later");
      }
    }
  }

  // Contains steps, maneuver and instruction data
  let steps = [];

  // Stores trip duration for when you get directions
  let duration = 0;

  // Guard to check if GeocodeResult from api fetch contains data
  if (geocodeResult) {
    steps = geocodeResult.routes[0].legs[0].steps;

    // calculation to get trip duration in minutes
    duration = Math.floor(geocodeResult.routes[0].duration / 60);
  }

  const handleGoBack = () => {
    return navigate("/jobs");
  };

  return (
    <div className="jobsview-container">
      <Nav />

      <div className="jobsview-sub1">
        <h1>{request.taskName}</h1>
        <p>
          Requester: <span>{request.name}</span>
        </p>
        <p>
          Age: <span> {request.age}</span>
        </p>
        <p>
          Ethnicity: <span> {request.ethnicity}</span>
        </p>
        <p>
          Gender: <span> {request.gender}</span>
        </p>
        <p>
          Difficulty: <span> {request.difficulty}</span>
        </p>
        <p>Description:</p>
        <p id="description">{request.details}</p>
      </div>

      <div className="jobsview-buttons">
        <YellowButton onClick={handleGoBack}>Go Back</YellowButton>
        <Popup
          trigger={<button>Get Directions</button>}
          onOpen={(e) => {
            getDirectionsClicked();
          }}
          position="right bottom"
        >
          {steps && (
            <div className="popupContent">
              <p>
                <strong>Trip duration: {duration} min 🏎️</strong>
              </p>
              <ol>
                {steps.map((step, index) => {
                  return (
                    <li className="list" key={index}>
                      {step.maneuver.instruction}
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </Popup>
        {/* <Popup
          trigger={<YellowButton>Get Directions</YellowButton>}
          onOpen={(e) => {
            getDirectionsClicked();
          }}
          position="right center"
        >
          {steps && (
            <div className="popupContent">
              <p>
                <strong>Trip duration: {duration} min 🏎️</strong>
              </p>
              <ol>
                {steps.map((step, index) => {
                  return (
                    <li className="list" key={index}>
                      {step.maneuver.instruction}
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </Popup> */}
      </div>
    </div>
  );
}

export default JobsView;
