import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Routes
import Login from "./Login";
import Register from "./Register";
import Create from "./Create";
import Home from "./Home";
import Request from "./Request";
import ViewRequest from "./ViewRequest";
import Offer from "./Offer";
import YourRequests from "./YourRequests";
import Applications from "./Applications";
import Jobs from "./Jobs";
import Profile from "./Profile";
import JobsView from "./JobsView";


function App() {

  return (
	<Router basename="/">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
		<Route exact path="/create" element={<Create />} />
		<Route exact path="/home" element={<Home />} />
		<Route exact path="/request" element={<Request />} />
		<Route exact path="/viewrequest" element={<ViewRequest />} />
		<Route exact path="/offer" element={<Offer />} />
		<Route exact path="/yourrequests" element={<YourRequests />} />
		<Route exact path="/applications" element={<Applications />} />
		<Route exact path="/jobs" element={<Jobs />} />
		<Route exact path="/profile" element={<Profile />} />
		<Route exact path="/jobsview" element={<JobsView />} />

      </Routes>
    </Router>
  );
}

export default App;
