import React from "react";
import { useState } from "react";
import "./styles/Nav.css";

export default function Nav() {
  const [ openMenu, setOpenMenu ] = useState(false);
  const [ authorization, setAuthorization ] = useState(true);

  return (
    <div className="nav">
      <div className="container">
        <div className="nav__logo">ilhmj</div>
        <i className={authorization ? "fas fa-sign-out-alt" : "fas fa-sign-in-alt" }></i>
      </div>
    </div>
  );
};
