import React from "react";

const RadioButton = ({ logo, onChange, value, checked, disabled }) => {
  return (
    <label htmlFor={value} style={{ display: "inline-block" }}>
      <input
        type="radio"
        id={value}
        name="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        style={{ display: "none" }}
		disabled={disabled}
      />
      <img
        src={logo}
        alt={value}
        style={{
          cursor: "pointer"
        }}
      />
    </label>
  );
};

export default RadioButton;
