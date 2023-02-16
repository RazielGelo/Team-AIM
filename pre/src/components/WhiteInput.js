import React from "react";
import "../styles/WhiteInput.css";

const WhiteInput = ({ type = "text", value, onChange, style, logo, placeholder, disabled }) => (
  <div className="WhiteInput" style={style}>
    <img src={logo} alt="" />
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} />
  </div>
);

export default WhiteInput;