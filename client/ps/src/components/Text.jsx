import React from "react";
import "./styles/Text.css";

export default function Text({ text, className, refField, onKeyDown, placeholder = "Обо мне" }) {
  return (
    <textarea
      ref={refField}
      defaultValue={text}
      placeholder={placeholder}
      className={`text ${className}`}
      type="text"
     ></textarea>
  );
};
