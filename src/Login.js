// React imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import YellowButton from "./components/YellowButton";
import WhiteInput from "./components/WhiteInput";

// CSS
import "./styles/Login.css";

// Logos
import emailLogo from "./images/email.png";
import passwordLogo from "./images/password.png";
import preLogo from "./images/pre.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  let navigate = useNavigate();

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
    const checkAccount = JSON.parse(localStorage.getItem("accounts")) || [];
    const filteredAccount = checkAccount.find(
      (account) => account.email.toLowerCase() === email.toLowerCase()
    );
    if (!filteredAccount) {
      setShowErrorMessage(true);
      setErrorMessage("Email doesn't exist.");
      return;
    }
    if (password !== filteredAccount.password) {
      setShowErrorMessage(true);
      setErrorMessage("Incorrect password.");
      return;
    }
    localStorage.setItem("session", JSON.stringify(filteredAccount));
    setShowSuccessMessage(true);
    setErrorMessage("");
    setSuccessMessage("Login successful!");
  };

  return (
    <div className="login-container">
      <div className="login-inner">
        <div className="login-sub1">
          <div className="logores">
            <img src={preLogo} alt="pre" />
          </div>
          <h3>LOGIN</h3>
          {showErrorMessage && <p id="error-message">{errorMessage}</p>}
          {showSuccessMessage && <p id="success-message">{successMessage}</p>}
          <div>
            <WhiteInput
              id="input-field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              logo={emailLogo}
            />
            <WhiteInput
              id="input-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              logo={passwordLogo}
            />
          </div>

          <p>
            Don't have an account yet? <a href="/register">Signup</a>
          </p>
          <YellowButton onClick={handleSubmit}>Login</YellowButton>
        </div>
        <div className="login-sub2">
          <img src={preLogo} alt="pre" />
        </div>
      </div>
    </div>
  );
};

export default Login;

