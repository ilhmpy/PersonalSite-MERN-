import React from "react";
import "./styles/Input.css"

export default function Input({ placeholder, maxLength, className, type = "text" }) {
  return (
    <input className={`input ${className}`} maxLength={maxLength ? maxLength : ""} type={type} placeholder={placeholder} />
  )
};
