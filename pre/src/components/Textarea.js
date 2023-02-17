import React, { useState } from "react";
import "../styles/Textarea.css"

const TextArea = ({ placeholder, rows, cols, onChange, value, disabled }) => {

  return (
    <div className="Textarea">
      <textarea
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        value={value}
        onChange={onChange}
		disabled={disabled}
      />
    </div>
  );
};

export default TextArea;
