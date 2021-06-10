import React from "react";
import { useState } from "react";
import "./styles/Main.css";

export default function Main() {
  function postMessage(value) {
    async function inner() {
      let req = await fetch("http://localhost:8000/api/bot/send-message", {
        method: "POST",
        body: JSON.stringify(value),
        headers: { "content-type": "application/json" }
      });
      let res = await req.json();
    };
    inner();
  };

  return (
    <div className="main">
      <div className="container">
        <div className="main__about">
          <h1><span>Front-end</span> разработка сайтов</h1>
          <p>
            Качественная и быстрая работа. Постоянная связь и заинтересованность в прекрасном результате.
          </p>
        </div>
        <div className="main__form">
          <h3 className="main__form_title"><span>Отправьте</span> мне сообщение и я выйду с вами на связь</h3>
          <input className="main__form_input name" placeholder="Ваше имя" type="text" />
          <input className="main__form_input connect" placeholder="Ваш имейл(или другой способ связи)" type="text" />
          <textarea className="main__form_textarea message" placeholder="Сообщение" maxLength="600"></textarea>
          <button className="main__form_button" onClick={() => {
            if (
              document.querySelector(".name").value.length > 0 &
              document.querySelector(".connect").value.length > 0 &
              document.querySelector(".message").value.length > 0
            ) postMessage(
              {
                name: document.querySelector(".name").value,
                connect: document.querySelector(".connect").value,
                message: document.querySelector(".message").value
              }
           );
          }}>Отправить сообщение</button>
        </div>
      </div>
      <div className="main__advantages">
        <div className="main__advantages__title_box">
          <h1><span>Мои</span> преимущества</h1>
          <p>Здесь вы можете увидеть мои преимущества перед другими в работе над вашими проектами.</p>
        </div>
        <div className="main__advantages_cards">
          <div className="main__advantages_card" style={{ background: "#4eb2f7" }}>
            <i className="fas fa-hourglass-start"></i>
            <h3>Время</h3>
            <p style={{ width: "60%" }}>Ваше сэкономленное время и успех проекта.</p>
          </div>
          <div className="main__advantages_card" style={{ background: "#c049f8" }}>
            <i className="fas fa-briefcase"></i>
            <h3>Начало работы</h3>
            <p>
              Не пройдет и 20 минут как я начну работать над вашим проектом, уже буквально через несколько часов после договоренности
              со мной часть работы будет уже выполнена.
            </p>
          </div>
          <div className="main__advantages_card" style={{ background: "#817eff" }}>
            <i className="fas fa-business-time"></i>
            <h3>График работы</h3>
            <p>
              Мой график работы с 9 до 9. В связи с таким графиком я выполняю работу в срок,
              чаще всего даже раньше.
            </p>
          </div>
          <div className="main__advantages_card" style={{ background: "#f74770" }}>
            
          </div>
        </div>
      </div>
    </div>
  );
};
