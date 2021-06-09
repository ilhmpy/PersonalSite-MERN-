import React from "react";
import { useState } from "react";
import "./styles/Nav.css";

export default function Nav() {
  const [ openMenu, setOpenMenu ] = useState(false);

  return (
    <div className="nav">
      <div className="container">
        <div className="nav__logo">ilhmj</div>
        <button className="nav__bar" onClick={() => {
          setOpenMenu(true);
          document.querySelector(".nav__left_menu").classList.add("open");
        }}>
          <span></span>
        </button>
      </div>
      <div className="black_bg"
        style={{ display: openMenu ? "block" : "none" }}
        onClick={() => {
          setOpenMenu(false);
          document.querySelector(".nav__left_menu").classList.remove("open");
        }}
      >
        <div className="nav__left_menu">
          <a href="#" className="nav__left_menu_link">Связь со мной</a>
          <a href="#" className="nav__left_menu_link">Процесс разработки</a>
          <a href="#" className="nav__left_menu_link">Мои работы</a>
          <a href="#" className="nav__left_menu_link">Мои соц. сети</a>
        </div>
      </div>
    </div>
  );
};
