import React from "react";
import "./styles/Input.css"

export default function Input({ placeholder, maxLength, correct, className, type = "text", refField  }) {
  return (
    <input
        ref={refField}
        defaultValue=""
        className={`input ${className} ${correct != null ? correct ? "valid" : "notValid" : ""}`}
        maxLength={maxLength ? maxLength : ""} type={type} placeholder={placeholder}
    />
  )
};
