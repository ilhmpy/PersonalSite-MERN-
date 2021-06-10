import React from "react";
import "./styles/Text.css";

export default function Text({ text, className, placeholder = "Обо мне" }) {
  return (
    <textarea defaultValue={text} placeholder={placeholder} className={`text ${className}`} type="text"></textarea>
  );
};
