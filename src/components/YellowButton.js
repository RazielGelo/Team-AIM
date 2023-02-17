import React from 'react';
import "../styles/YellowButton.css";

const YellowButton = ({ children, onClick, style, disabled }) => (
  <button className="YellowButton" onClick={onClick} style={style} disabled={disabled}>
    {children}
  </button>
);

export default YellowButton;