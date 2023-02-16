import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Create from "./Create";
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <Router basename="/">
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/create" element={<Create />} />
      </Router>

  );
}

export default App;
