import "./styles/Request.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Textarea from "./components/Textarea";
import Nav from "./components/Nav";
import WhiteInput from "./components/WhiteInput";
import YellowButton from "./components/YellowButton";
import taskLogo from "./images/task.png";

function Request() {
  const options = ["Easy", "Medium", "Difficult"];
  const [selectedValue, setSelectedValue] = useState("Easy");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [filteredAccount, setfilteredAccount] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [details, setDetails] = useState("");

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
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const user = accounts.find((account) => account.email === session.email);

    const element = document.getElementById("ref");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    if (!taskName) {
      setShowErrorMessage(true);
      setErrorMessage("Please enter a task name.");
      return;
    }

    if (!selectedValue) {
      setShowErrorMessage(true);
      setErrorMessage("Please select a difficulty.");
      return;
    }
    if (!details) {
      setShowErrorMessage(true);
      setErrorMessage(`Please enter details of your request.`);
      return;
    }
    if (user.requests.length >= 5) {
      setShowErrorMessage(true);
      setErrorMessage(`You can only create up to 5 requests.`);
      return;
    }

    let uniqueTaskName = taskName;
    let taskNumber = 1;
    while (
      user.requests.find((request) => request.taskName === uniqueTaskName)
    ) {
      uniqueTaskName = `${taskName} (${++taskNumber})`;
    }

    const updatedUser = {
      email: session.email,
      password: session.password,
      name: session.name,
      ethnicity: session.ethnicity,
      gender: session.gender,
      age: session.age,
      phoneNumber: session.phoneNumber,
      requests: [
        ...(session.requests || []),
        {
          taskName: uniqueTaskName,
          difficulty: selectedValue,
          details: details,
          applications: [],
          status: "waiting",
        },
      ],
    };

    const filteredAccounts = accounts.filter(
      (account) => account.email !== session.email
    );
    filteredAccounts.push(updatedUser);
    localStorage.setItem("accounts", JSON.stringify(filteredAccounts));
    localStorage.setItem("session", JSON.stringify(updatedUser));
    setShowSuccessMessage(true);
    setErrorMessage("");
    setSuccessMessage("Request creation successful!");
  };

  return (
    <div className="request-container">
      <Nav />

      <div className="request-sub1">
        <h3 id="ref">REQUEST</h3>
        <p>Fill out the fields to post your request.</p>
        {showErrorMessage && <p id="create-error-message">{errorMessage}</p>}
        {showSuccessMessage && (
          <p id="create-success-message">{successMessage}</p>
        )}
        <WhiteInput
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
          logo={taskLogo}
        />
        <div className="difficulty">
          <p>Task Difficulty</p>
          <div className="dropdown">
            <select
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Textarea
          placeholder="Enter task/request details"
          rows={5}
          cols={50}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <YellowButton onClick={handleSubmit}>Post</YellowButton>
      </div>
    </div>
  );
}

export default Request;