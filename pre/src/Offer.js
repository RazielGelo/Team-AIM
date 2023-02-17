// React imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import WhiteInput from "./components/WhiteInput";
import YellowButton from "./components/YellowButton";
import Textarea from "./components/Textarea";
import Nav from "./components/Nav";

// CSS
import "./styles/Offer.css";

// Logos
import dollarLogo from "./images/dollar.png";

function Offer() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [description, setDescription] = useState("");
  const [fee, setFee] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    if (!session) {
      return navigate("/");
    }
  }, []);

  useEffect(() => {
    if (successMessage) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        return navigate("/home");
      }, 3000);
    }
  }, [successMessage, navigate]);

  useEffect(() => {
    if (errorMessage) {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [errorMessage]);

const handleSubmit = () => {
	const session = JSON.parse(localStorage.getItem("session")) || {};
	const request = JSON.parse(localStorage.getItem("request")) || {};
	const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
	const user = accounts.find((account) => account.email === request.email);
  
	const element = document.getElementById("ref");
	if (element) {
	  element.scrollIntoView({
		behavior: "smooth",
		block: "start",
	  });
	}
	if (request.applications?.find((app) => app.companionEmail === session.email)) {
		setShowErrorMessage(true);
		setErrorMessage("You have already applied to this request.");
		return;
	  }
	if (!description) {
	  setShowErrorMessage(true);
	  setErrorMessage(
		"Please enter a short description on how you are fit to be a companion for this task/activity."
	  );
	  return;
	}
  
	if (!fee) {
	  setShowErrorMessage(true);
	  setErrorMessage(
		"Please enter a fee for your companion services. You can enter 0 for a free service."
	  );
	  return;
	}
	if (!/\d/.test(fee)) {
	  setShowErrorMessage(true);
	  setErrorMessage("Fee must only contain numbers.");
	  return;
	}
  
	const updatedUser = {
	  ...user,
	  requests: [
		...user.requests.map((req) => {
		  if (req.taskName === request.taskName) {
			return {
			  ...req,
			  applications: [
				...(req.applications || []),
				{
				  companionEmail: session.email,
				  companionName: session.name,
				  companionAge: session.age,
				  companionEthnicity: session.ethnicity,
				  companionGender: session.gender,
				  companionPhone: session.phoneNumber,
				  description: description,
				  fee: fee,
				  status: "waiting"
				},
			  ],
			};
		  } else {
			return req;
		  }
		}),
	  ],
	};
  
	const filteredAccounts = accounts.filter(
	  (account) => account.email !== user.email
	);
	filteredAccounts.push(updatedUser);
	localStorage.setItem("accounts", JSON.stringify(filteredAccounts));
	setShowSuccessMessage(true);
	setErrorMessage("");
	setSuccessMessage("Sending offer successful!");
  };
  

  return (
    <div className="offer-container">
      <Nav />

      <div className="offer-sub1">
        <h3 id="ref">SEND OFFER</h3>
        <p>
          Please fill out the fields for the requester to see your offer for
          companionship.
        </p>
        {showErrorMessage && <p id="create-error-message">{errorMessage}</p>}
        {showSuccessMessage && (
          <p id="create-success-message">{successMessage}</p>
        )}
        <Textarea
          placeholder="Enter a brief description on how you are suited to be a companion for this request."
          rows={5}
          cols={50}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <WhiteInput
          type="text"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
          placeholder="Enter fee or enter 0 for free service."
          logo={dollarLogo}
        />
        <YellowButton onClick={handleSubmit}>Send</YellowButton>
      </div>
    </div>
  );
}

export default Offer;
