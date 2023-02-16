import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Create from "./Create";
import Login from "./Login";
import Register from "./Register";
import Request from "./Request";
import YourRequests from "./YourRequests";

function App() {
  return (
    <Router basename="/">
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/create" element={<Create />} />
      <Route exact path="/request" element={<Request />} />
      <Route exact path="/yourrequests" element={<YourRequests />} />
      </Router>

  );
}

export default App;
