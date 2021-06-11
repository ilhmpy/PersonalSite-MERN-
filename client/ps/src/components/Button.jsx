import React from "react";
import "./styles/Button.css";

export default function Button({ onButton, text }) {
  return (
    <button className="button" onClick={e => onButton(e)}>{text}</button>
  );
};
