import React from "react";
import "../styles/Nav.css";
import prelogo from "../images/preLogo.png";

const Nav = () => (
  <div className="Nav">

    <div className="Sub1">
      <a id="navLogo" href="/home">
        <img src={prelogo} alt="preLogo" />
      </a>
    </div>

    <div className="Sub2">
      <a href="/jobs">YOUR JOBS</a>
      <a href="/home">REQUESTS</a>
      <a href="/yourrequests">YOUR REQUESTS</a>
    </div>

    <div className="Sub3">
	<a href="/profile">MY PROFILE</a>
	</div>

  </div>
);

export default Nav;
