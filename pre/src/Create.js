import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WhiteInput from "./components/WhiteInput";
import RadioButton from "./components/RadioButton";
import YellowButton from "./components/YellowButton";
import nameLogo from "./images/name.png";
import ethnicityLogo from "./images/ethnicity.png";
import ageLogo from "./images/age.png";
import phoneLogo from "./images/phonenumber.png";
import femaleLogo from "./images/girl.png";
import maleLogo from "./images/boy.png";
import otherLogo from "./images/other.png";
import preLogo from "./images/pre.png";
import "./styles/Create.css";

function Create() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  let navigate = useNavigate();

  const [user, setUser] = useState({
    email: JSON.parse(localStorage.getItem("session")).email,
    password: JSON.parse(localStorage.getItem("session")).password,
    name: "",
    ethnicity: "",
    age: "",
    gender: "",
    phoneNumber: "",
  });

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
        return navigate("/");
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

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    let formattedValue = value.replace(/\D/g, ""); // remove all non-numeric characters
    if (formattedValue.length > 0) {
      formattedValue = formattedValue.match(/(\d{1,3})(\d{0,3})(\d{0,4})/); // split into groups of 3 digits
      formattedValue = [formattedValue[1], formattedValue[2], formattedValue[3]]
        .filter((group) => group.length > 0)
        .join("-"); // join groups with dashes
    }
    setUser({ ...user, phoneNumber: formattedValue });
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
    const updatedUser = {
      email: user.email,
      password: user.password,
      name: user.name,
      ethnicity: user.ethnicity,
      gender: user.gender,
      age: user.age,
      phoneNumber: user.phoneNumber,
      requests: [],
      jobs: [],
    };
    filteredAccounts.push(updatedUser);
    localStorage.setItem("accounts", JSON.stringify(filteredAccounts));
    localStorage.setItem(
      "session",
      JSON.stringify({
        email: updatedUser.email,
        password: updatedUser.password,
      })
    );
    setShowSuccessMessage(true);
    setErrorMessage("");
    setSuccessMessage("Profile creation successful!");
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegEx = /^\d{3}-\d{3}-\d{4}$/;
    return phoneNumberRegEx.test(phoneNumber);
  };

  return (
    <div className="create-container">
      <div className="create-sub1">
        <h3 id="ref">PROFILE CREATION</h3>
        <p>
          You are almost done, fill out the fields to complete your account
          creation.
        </p>
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
          onChange={handlePhoneNumberChange}
          placeholder="Enter your phonenumber"
          logo={phoneLogo}
        />

        <div className="create-gender">
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
        <YellowButton onClick={handleSubmit}>Create</YellowButton>
      </div>

      <div className="create-sub2">
        <img src={preLogo} alt="pre" />
      </div>
    </div>
  );
}

export default Create;