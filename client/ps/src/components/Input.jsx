import React from "react";
import "./styles/Input.css"

export default function Input({ placeholder, maxLength, correct, className, type = "text" }) {
  return (
    <input
        className={`input ${className} ${correct != null ? correct ? "valid" : "notValid" : ""}`}
        maxLength={maxLength ? maxLength : ""} type={type} placeholder={placeholder}
    />
  )
};
