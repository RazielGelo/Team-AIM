import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import YellowButton from "./components/YellowButton";
import WhiteInput from "./components/WhiteInput";
import "./styles/Register.css";
import emailLogo from "./images/email.png";
import passwordLogo from "./images/password.png";
import confirmpassLogo from "./images/confirm.png";
import preLogo from "./images/pre.png";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  let navigate = useNavigate();

  const user = { email, password };
  const accounts = [];

  useEffect(() => {
    if (successMessage) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        return navigate("/create");
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
    const checkAccount = JSON.parse(localStorage.getItem("accounts"));

    if (!checkAccount) {
      if (!email || !password || !confirm) {
        setShowErrorMessage(true);
        setErrorMessage("Please fill out all fields.");
        return;
      }

      if (!emailRegex.test(email)) {
        setShowErrorMessage(true);
        setErrorMessage("Please enter a valid email address.");
        return;
      }

      if (!passwordRegex.test(password)) {
        setShowErrorMessage(true);
        setErrorMessage(
          "Password must be 8 characters long, have at least 1 uppercase, 1 lowercase, and 1 digit character."
        );
        return;
      }

      if (password !== confirm) {
        setShowErrorMessage(true);
        setErrorMessage("Passwords do not match.");
        return;
      }

      accounts.push(user);
      localStorage.setItem("accounts", JSON.stringify(accounts));
      localStorage.setItem("session", JSON.stringify(user));
      setShowSuccessMessage(true);
      setErrorMessage("");
      setSuccessMessage("Registration successful!");
    } else {
      const filteredAccount = checkAccount.find(
        (account) => account.email.toLowerCase() === email.toLowerCase()
      );
      if (filteredAccount) {
        setShowErrorMessage(true);
        setErrorMessage("Email already exists.");
        return;
      }

      if (!email || !password || !confirm) {
        setShowErrorMessage(true);
        setErrorMessage("Please fill out all fields.");
        return;
      }

      if (!emailRegex.test(email)) {
        setShowErrorMessage(true);
        setErrorMessage("Please enter a valid email address.");
        return;
      }

      if (!passwordRegex.test(password)) {
        setShowErrorMessage(true);
        setErrorMessage(
          "Password must be 8 characters long, have at least 1 uppercase, 1 lowercase, and 1 digit character."
        );
        return;
      }

      if (password !== confirm) {
        setShowErrorMessage(true);
        setErrorMessage("Passwords do not match.");
        return;
      }

      checkAccount.push(user);
      localStorage.setItem("accounts", JSON.stringify(checkAccount));
      localStorage.setItem("session", JSON.stringify(user));
      setShowSuccessMessage(true);
      setErrorMessage("");
      setSuccessMessage("Registration successful!");
    }
  };

  return (
    <div className="register-container">
      <div className="register-inner">
        <div className="register-sub1">
          <div className="logores">
            <img src={preLogo} alt="pre" />
          </div>
          <h3>REGISTER</h3>
          {showErrorMessage && <p id="error-message">{errorMessage}</p>}
          {showSuccessMessage && <p id="success-message">{successMessage}</p>}
          <div>
            <WhiteInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              logo={emailLogo}
            />
            <WhiteInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              logo={passwordLogo}
            />
            <WhiteInput
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm your password"
              logo={confirmpassLogo}
            />
          </div>

          <p>
            Already have an account? <a href="/">Signin</a>
          </p>
          <YellowButton onClick={handleSubmit}>Register</YellowButton>
        </div>
        <div className="register-sub2">
          <img src={preLogo} alt="pre" />
        </div>
      </div>
    </div>
  );
}

export default Register;
