import React from "react";
import { useState } from "react";
import "./styles/Sign.css";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import EmailAccepted from "../components/EmailAccepted.jsx";
import Query from "../Query.js";

const $ = new Query();

export default function Sign() {
  const [ email, setEmail ] = useState("");
  const [ openEmailAccepted, setOpenEmailAccepted ] = useState(false);
  const [ already, setAlready ] = useState(false);
  const [ code, setCode ] = useState(0);
  const [ token, setToken ] = useState("");

  function postRegisterData(object) {
    async function inner() {
      let req = await fetch("http://localhost:8000/api/users/add", {
        method: "POST",
        body: JSON.stringify(object),
        headers: { "content-type": "application/json" }
      });
      let res = await req.json();
      let login = document.querySelector(".up-login");
      let email = document.querySelector(".up-email");
      let password = document.querySelector(".up-password");
      console.log(res);
      if (req.status >= 200 & req.status < 300) {
        $.removeClass(login, "notValid");
        $.removeClass(email, "notValid");
        $.removeClass(password, "notValid");
        $.addClass(login, "valid");
        $.addClass(email, "valid");
        $.addClass(password, "valid");
        setOpenEmailAccepted(true);
        setCode(res.detail.code);
        setToken(res.detail.token)
      } else {
        $.removeClass(login, "valid");
        $.removeClass(email, "valid");
        $.removeClass(password, "valid");
        $.addClass(login, "notValid");
        $.addClass(email, "notValid");
        $.addClass(password, "notValid");
        setAlready(true);
      };
    };
    inner();
  };

  window.addEventListener("keydown", e => {
    if (e.keyCode == 27) {
      setOpenEmailAccepted(false);
    };
  });

  return (
    <div className="sign">
      <EmailAccepted
        email={email}
        code={code}
        token={token}
        openStatus={openEmailAccepted}
        setOpenStatus={setOpenEmailAccepted}
      />
      <div className="sign__modal" style={{ display: openEmailAccepted ? "none" : "block" }}>
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
                 let login = document.querySelector(".up-login");
                 let email = document.querySelector(".up-email");
                 let password = document.querySelector(".up-password");
                 if (
                      login.value.length > 0 &
                      email.value.length > 0 &
                      password.value.length > 0
                  ) {
                      $.removeClass(login, "notValid");
                      $.removeClass(email, "notValid");
                      $.removeClass(password, "notValid");
                      $.addClass(login, "valid");
                      $.addClass(email, "valid");
                      $.addClass(password, "valid");
                      postRegisterData({ login: login.value, email: email.value, password: password.value });
                      setEmail(email.value);
                  } else {
                       $.removeClass(login, "valid");
                       $.removeClass(email, "valid");
                       $.removeClass(password, "valid");
                       $.addClass(login, "notValid");
                       $.addClass(email, "notValid");
                       $.addClass(password, "notValid");
                  };
               }}
               text="Зарегистрироваться"
            />
            <h3 className="already" style={{ display: already ? "block" : "none" }}>Аккаунт с таким именем или имейлом уже имеется.</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
