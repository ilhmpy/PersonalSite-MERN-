import React from "react";
import { useState } from "react";
import "./styles/Nav.css";

export default function Nav() {
  const [ openSign, setOpenSign ] = useState(false);
  const [ authorization, setAuthorization ] = useState(false);


  return (
    <div className="nav">
      <div className="container">
        <div className="nav__logo" onClick={e => window.location.href = "/"}>ilhmj</div>
        <i
          className={authorization ? "fas fa-sign-out-alt" : "fas fa-sign-in-alt" }
          onClick={e => {
            if (e.target.className == "fas fa-sign-out-alt") {
              return false;
            };
            if (e.target.className == "fas fa-sign-in-alt") {
              window.location.href = "/sign";
              return false;
            };
          }}
        ></i>
      </div>
    </div>
  );
};
