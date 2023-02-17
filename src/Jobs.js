// React imports
import { useNavigate } from "react-router-dom";

// Components
import Nav from "./components/Nav";
import Carousel from "./components/Carousel";
import JobCard from "./components/JobCard";

// CSS
import "./styles/Jobs.css";

function Jobs() {
  const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  const session = JSON.parse(localStorage.getItem("session")) || {};

  let navigate = useNavigate();

  const matchingJobs = [];

  const handleViewClick = (cardEmail, cardTaskName) => {
    const request = matchingJobs.find(
      (req) =>
        req.email.toLowerCase() === cardEmail.toLowerCase() &&
        req.taskName.toLowerCase() === cardTaskName.toLowerCase()
    );

    localStorage.setItem("request", JSON.stringify(request));
    return navigate("/jobsview");
  };

  accounts.forEach((account) => {
    account.requests.forEach((request) => {
      request.applications.forEach((application) => {
        if (
          application.companionEmail === session.email &&
          application.status === "accepted"
		  && request.status !== "finished"
        ) {
          matchingJobs.push({
            key: request.id,
            email: request.email,
            name: request.name,
            taskName: request.taskName,
            age: request.age,
            ethnicity: request.ethnicity,
            gender: request.gender,
            phonenumber: request.phonenumber,
            difficulty: request.difficulty,
            details: request.details,
			location: request.location
          });
        }
      });
    });
  });

  return (
    <div className="jobs-container">
      <Nav />

      <div className="jobs-sub1">
        <h1>YOUR JOBS</h1>
      </div>

      <div className="jobs-sub2">
        <div className="jobs-carousel">
          <Carousel>
            {matchingJobs.map((request, index) => (
              <JobCard
                key={request.email + index}
                email={request.email}
                taskName={request.taskName}
                requester={request.name}
                age={request.age}
                ethnicity={request.ethnicity}
                gender={request.gender}
                phonenumber={request.phonenumber}
                difficulty={request.difficulty}
                details={request.details}
                onButtonClick={() =>
                  handleViewClick(request.email, request.taskName)
                }
              />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
