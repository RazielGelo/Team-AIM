// React imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import InputSearch from "./components/InputSearch";
import YellowButton from "./components/YellowButton";
import Nav from "./components/Nav";
import Carousel from "./components/Carousel";
import ViewCard from "./components/ViewCard";

// CSS
import "./styles/Home.css";

// Logos
import magnifyLogo from "./images/magnify.png";

function Home() {
  const [filteredRequest, setfilteredRequest] = useState([]);
  const sessionEmail = JSON.parse(localStorage.getItem("session")).email;
  const [searchText, setsearchText] = useState("");


  let navigate = useNavigate();

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const session = JSON.parse(localStorage.getItem("session")) || {};
    const otherRequests = accounts
      .filter((account) => account.email !== session.email)
      .flatMap((account) => account.requests);
    setfilteredRequest(otherRequests);
    // localStorage.setItem("requests", JSON.stringify(otherRequests));
  }, []);

  const handleCreate = () => {
    return navigate("/request");
  };

  const handleViewClick = (cardEmail, cardTaskName) => {
    const request = filteredRequest.find(
      (req) =>
        req.email.toLowerCase() === cardEmail.toLowerCase() &&
        req.taskName.toLowerCase() === cardTaskName.toLowerCase()
    );

    localStorage.setItem("request", JSON.stringify(request));
    return navigate("/ViewRequest");
  };

  return (
    <div className="home-container">
      <Nav />

      <div className="home-sub1">
        <p>FIND A REQUEST</p>
        <InputSearch
          type="search"
          logo={magnifyLogo}
          value={searchText}
          onChange={(e) => setsearchText(e.target.value)}
        />
        <YellowButton onClick={handleCreate}>Create Request</YellowButton>
      </div>

      <div className="home-sub2">
        <div className="home-carousel">
          <Carousel>
            {filteredRequest
              .filter((request) =>
                [request.taskName, request.difficulty, request.details]
                  .join("")
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              )
              .filter((request) => request.status === "waiting")
              .map((request, index) => (
                <ViewCard
                  key={request.email + index}
                  email={request.email}
                  taskName={request.taskName}
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

export default Home;
