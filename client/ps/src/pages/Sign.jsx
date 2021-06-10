import React from "react";
import "./styles/Sign.css";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";

export default function Sign() {
  return (
    <div className="sign">
      <div className="sign__modal">
        <div className="sign__modal_btns" onClick={e => {
          if (e.target.className == "sign__modal_btn") {
            document.querySelectorAll(".sign__modal_tab").forEach(tab => {
              if (tab.dataset.tab == e.target.dataset.tab) {
                document.querySelectorAll(".sign__modal_tab").forEach(tab => tab.style.display = "none");
                tab.style.display = "block";
              };
            });
          };
        }}>
          <button className="sign__modal_btn" data-tab="in">Вход</button>
          <button className="sign__modal_btn" data-tab="up">Регистрация</button>
        </div>
        <div className="sign__modal_tabs">
          <div className="sign__modal_tab" data-tab="in">
            <Input placeholder="Ваш логин" className="in-login" />
            <Input placeholder="Ваш пароль" type="password" className="in-password" />
            <Button
              onButton={e => {

              }}
              text="Войти"
            />
          </div>
          <div className="sign__modal_tab" data-tab="up" style={{ display: "none" }}>
            <Input placeholder="Логин" className="up-login" />
            <Input placeholder="Эмейл" type="email" className="up-email" />
            <Input placeholder="Пароль" type="password" className="up-password" />
            <Button
               onButton={e => {

               }}
               text="Зарегистрироваться"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
