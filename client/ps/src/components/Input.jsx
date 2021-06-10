import React from "react";
import "./styles/Input.css"

export default function Input({ placeholder, className, type = "text" }) {
  return (
    <input className={`input ${className}`} type={type} placeholder={placeholder} />
  )
};
