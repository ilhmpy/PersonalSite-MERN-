import React from "react";
import "./styles/Work.css";
import Query from "../Query.js";

const $ = new Query();

export default function Work({ id, onLiked, likes, photo, title, text }) {
  return (
    <div className="work" id={id} key={id} onClick={() => $.redirect(`/works/${id}`)}>
      <img draggable={false} src={photo} />
      <div className="work__about">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};
