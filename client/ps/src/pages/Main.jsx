import React from "react";
import { useState, useEffect } from "react";
import Work from "../components/Work.jsx";
import "./styles/Main.css";
import yoof from "../images/yoof.png";
import Footer from "../components/Footer.jsx";

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

        <div className="wrap">
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
      </div>

      <div className="wrap">
        <div className="main__about_me">
          <div className="container">
            <div className="main__advantages__title_box">
              <h1><span>Обо</span> мне</h1>
              <p>Здесь вы можете узнать немного информации обо мне</p>
            </div>
            <article className="main__about_me__texts">
              <p>
                Привет! Меня зовут Влад. Я front-end разработчик с опытом в пол года. В данный момент развиваюсь в основном в стеке MERN.
                Всегда интересуюсь новыми технологиями и не когда не останавливаю свое обучение. На фрилансе я работаю уже как второй месяц, за это
                время почерпал не мало опыта в выполнении задач разной сложности. Двигаюсь в направлении full-stack, как выше указано это стек
                MERN(MongoDB, Express.js, React.js, Node.js).
                Общий стек состоит из следующих технологий: HTML5, CSS3, SCSS, jQuery, React, Redux, Vue.js, Node.js, Express.js, MongoDB,
                адаптивная и кроссбраузерная верстка, методологии DRY(Don't Repeat Yourself), BEM(Block Element Modificator).
              </p>
              <p>
                Всегда открыт к сотрудничеству и новым проектам, пишите напрямую в телеграм или
                через форму.
              </p>
            </article>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="main__advantages">
          <div className="main__advantages__title_box">
            <h1><span>Мои</span> преимущества</h1>
            <p>Здесь вы можете увидеть мои преимущества перед другими в работе над вашими проектами.</p>
          </div>
          <div className="main__advantages_cards">
            <div className="main__advantages_card" style={{ background: "#4eb2f7" }}>
              <i className="fas fa-hourglass-start"></i>
              <h3>Время</h3>
              <p>Ваше сэкономленное время и успех проекта. Я c вероятностью в 99.9% заканчиваю проекты. </p>
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
              <i class="fas fa-shield-alt"></i>
              <h3>Гарантия</h3>
              <p>
                Если после выполнения работы и оплаты нужны правки, из-за возможных найденных багов или проблем, я исправлю их за бесплатно.
              </p>
            </div>
          </div>
       </div>

        <div className="wrap">
          <div className="main__my_works">
            <div className="container">
              <div className="main__advantages__title_box">
                <h1><span>Мои</span> работы</h1>
                <p>Здесь вы можете увидеть мои проекты.</p>
              </div>
              <div className="main__my_works__cards">
                <Work
                  id="0"
                  likes="0"
                  photo={yoof}
                  title="YOOF"
                  text="Ресурс помогающий покупателям найти выгодное предложение"
                />
              </div>
            </div>
          </div>
       </div>

       <Footer />

      </div>
    </div>
  );
};
