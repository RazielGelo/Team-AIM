// React imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import WhiteInput from "./components/WhiteInput";
import YellowButton from "./components/YellowButton";
import RadioButton from "./components/RadioButton";
import Nav from "./components/Nav";

// CSS
import "./styles/Profile.css";

// Logos
import nameLogo from "./images/name.png";
import ethnicityLogo from "./images/ethnicity.png";
import ageLogo from "./images/age.png";
import phoneLogo from "./images/phonenumber.png";
import femaleLogo from "./images/girl.png";
import maleLogo from "./images/boy.png";
import otherLogo from "./images/other.png";
function Profile() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  let navigate = useNavigate();

  const session = JSON.parse(localStorage.getItem("session")) || {};

  const [user, setUser] = useState({ ...session });

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

  const handleLogout = () => {
    localStorage.removeItem("session");
    return navigate("/");
  };

  const handleSubmit = () => {
    const element = document.getElementById("ref");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    if (!user.name) {
      setShowErrorMessage(true);
      setErrorMessage("Please enter your name.");
      return;
    }
    if (/\d/.test(user.name)) {
      setShowErrorMessage(true);
      setErrorMessage("Name must not contain numbers.");
      return;
    }
    if (!user.ethnicity) {
      setShowErrorMessage(true);
      setErrorMessage("Please enter your ethnicity.");
      return;
    }
    if (/\d/.test(user.ethnicity)) {
      setShowErrorMessage(true);
      setErrorMessage("Ethnicity must not contain numbers.");
      return;
    }
    if (!user.age) {
      setShowErrorMessage(true);
      setErrorMessage(`Please enter your age.`);
      return;
    }
    if (isNaN(user.age)) {
      setShowErrorMessage(true);
      setErrorMessage(`Age must be a number.`);
      return;
    }
    if (!user.gender) {
      setShowErrorMessage(true);
      setErrorMessage(`Please select your gender.`);
      return;
    }
    if (!user.phoneNumber) {
      setShowErrorMessage(true);
      setErrorMessage(`Please enter a contact number.`);
      return;
    }

    if (!validatePhoneNumber(user.phoneNumber)) {
      setShowErrorMessage(true);
      setErrorMessage(
        "Invalid phone number format. Please enter a valid phone number."
      );
      return;
    }

    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
const session = JSON.parse(localStorage.getItem("session")) || {};
const filteredAccounts = accounts.filter(
  (account) => account.email !== session.email
);

const currentUser = accounts.find((account) => account.email === session.email);
const updatedUser = {
  ...currentUser,
  email: user.email,
  password: user.password,
  name: user.name,
  ethnicity: user.ethnicity,
  gender: user.gender,
  age: user.age,
  phoneNumber: user.phoneNumber,
};

filteredAccounts.push(updatedUser);
localStorage.setItem("accounts", JSON.stringify(filteredAccounts));
localStorage.setItem("session", JSON.stringify(updatedUser));
setShowSuccessMessage(true);
setErrorMessage("");
setSuccessMessage("Edit profile successful!");

  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegEx = /^\d{3}-\d{3}-\d{4}$/;
    return phoneNumberRegEx.test(phoneNumber);
  };

  return (
    <div className="profile-container">
      <Nav />
      <div className="profile-sub1">
        <h3 id="ref">YOUR PROFILE</h3>
        <p>You can view or edit your profile here and also log out.</p>
        {showErrorMessage && <p id="create-error-message">{errorMessage}</p>}
        {showSuccessMessage && (
          <p id="create-success-message">{successMessage}</p>
        )}
        <WhiteInput
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Name"
          logo={nameLogo}
        />
        <WhiteInput
          type="text"
          value={user.ethnicity}
          onChange={(e) => setUser({ ...user, ethnicity: e.target.value })}
          placeholder="Ethnicity"
          logo={ethnicityLogo}
        />
        <WhiteInput
          type="text"
          value={user.age}
          onChange={(e) => setUser({ ...user, age: e.target.value })}
          placeholder="Age"
          logo={ageLogo}
        />
        <WhiteInput
          type="text"
          value={user.phoneNumber}
          onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
          placeholder="Enter your phonenumber"
          logo={phoneLogo}
        />

        <div className="profile-gender">
          <p>Gender</p>
          <RadioButton
            logo={femaleLogo}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
            value="Girl"
            checked={user.gender === "Girl"}
          />
          <RadioButton
            logo={maleLogo}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
            value="Boy"
            checked={user.gender === "Boy"}
          />
          <RadioButton
            logo={otherLogo}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
            value="Other"
            checked={user.gender === "Other"}
          />
        </div>
        <div className="profile-sub2">
          <YellowButton id="save" onClick={handleSubmit}>
            Save
          </YellowButton>
          <YellowButton id="logout" onClick={handleLogout}>
            Logout
          </YellowButton>
        </div>
      </div>
    </div>
  );
}

export default Profile;
