import React from "react";
import "./styles/Message.css";

export default function Message({ from, text, id, onDelete }) {
  return (
    <div className="message" id={id} key={id}>
      <div className="message__from">От: {from} <i class="fas fa-trash" onClick={e => onDelete(e)}></i></div>
      <div className="message__text">{text}</div>
    </div>
  );
};
