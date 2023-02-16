import React from "react";
import "../styles/InputSearch.css";

const InputSearch = ({ type = "text", value, onChange, style, logo, placeholder }) => (
  <div className="InputSearch" style={style}>
    <img src={logo} alt="" />
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} />
  </div>
);

export default InputSearch;
