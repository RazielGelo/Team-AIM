import React, { useState, useEffect } from "react";

const Dropdown = ({options, onChange, disabled, id, defaultValue}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  
  useEffect(() => {
    const storedValue = localStorage.getItem(id);
    if (storedValue) {
      setSelectedValue(storedValue);
    } else {
      setSelectedValue(defaultValue);
    }
  }, []);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    localStorage.setItem(id, e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="dropdown">
      <select value={selectedValue} onChange={handleChange} disabled={disabled}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
