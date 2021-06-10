import React from "react";
import "./styles/Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__socials">
          <a href="https://freelance.habr.com/freelancers/Vlados-JS" style={{ fontSize: ".60em" }}>Хабр</a>
          <a href="https://t.me/Ilhmj23"><i class="fab fa-telegram-plane"></i></a>
          <a href="https://github.com/ilhmpy"><i class="fab fa-github"></i></a>
          <a href="mailto:jsih1236@gmail.com"><i class="fab fa-google"></i></a>
        </div>
      </div>
    </div>
  )
};
