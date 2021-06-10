import React from "react";
import "./styles/Work.css";

export default function Work({ id, likes, photo, title, text }) {
  return (
    <div className="work" id={id} key={id}>
      <img draggable={false} src={photo} />
      <div className="work__about">
        <h3>{title}</h3>
        <p>{text}</p>
        <span><i className="fas fa-heart"></i> {likes}</span>
      </div>
    </div>
  );
};
