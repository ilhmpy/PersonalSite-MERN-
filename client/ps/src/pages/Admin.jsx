import React from "react";
import { useState, useEffect } from "react";
import "./styles/Admin.css";

import Message from "../components/Message.jsx";
import Text from "../components/Text.jsx";
import Button from "../components/Button.jsx";
import PortfolioWork from "../components/PortfolioWork.jsx";
import AddWork from "../components/AddWork.jsx";
import Account from "../components/Account.jsx";

import Query from "../Query.js";

const $ = new Query();

export default function Admin() {
  const [ openAddWork, setOpenAddWork ] = useState(false);
  const [ aboutText, setAboutText ] = useState("");

  const [ messages, setMessages ] = useState([]);
  const [ works, setWorks ] = useState([]);
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    async function getMessages() {
      let req = await fetch("http://localhost:8000/api/messages/get-messages", {
        method: "GET",
        headers: { "content-type": "application/json" }
      });
      let res = await req.json();
      if (req.status == 200) setMessages(res.detail);
    };

    async function getAboutText() {
      let req = await fetch("http://localhost:8000/api/about/get-text", {
        method: "GET",
        headers: { "content-type": "application/json" }
      });
      let res = await req.json();
      if (req.status == 200) setAboutText(res.detail.text);
    };

    async function getUsers() {
      let req = await fetch("http://localhost:8000/api/users/get-all-users", {
        method: "GET",
        headers: { "content-type": "application/json" }
      });
    };

    getUsers();
    getAboutText();
    getMessages();
  }, []);

  function deleteMessage(msg) {
    async function inner() {
      let req = await fetch(`http://localhost:8000/api/messages/delete-message?message=${msg}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" }
      });
      let res = await req.json();
    };
    inner();
  };

  function putAboutMeText(text) {
    async function inner() {
      let req = await fetch("http://localhost:8000/api/about/put-text", {
        method: "PUT",
        body: JSON.stringify({ text }),
        headers: { "content-type": "application/json" }
      });
      let res = await req.json();
      console.log(res);
    };
    inner();
  };

  window.addEventListener("keydown", e => {
    if (e.keyCode === 27) {
      setOpenAddWork(false);
    };
  });

  return (
    <div className="admin">
      <AddWork
        openStatus={openAddWork}
        setOpenStatus={setOpenAddWork}
        onButton={value => {}}
      />
      <div className="admin__modal" style={{ display:  openAddWork ? "none" : "block" }}>
        <div className="container">
          <div className="admin__modal_panel" onClick={e => {
            if (e.target.className == "admin__modal_btn") {
              document.querySelectorAll(".admin__modal_tab").forEach(tab => tab.style.display = "none");
              document.querySelectorAll(".admin__modal_tab").forEach(tab => {
                if (tab.dataset.tab == e.target.dataset.tab) tab.style.display = "block";
              });
            };
          }}>
            <div className="admin__modal_btn" data-tab="messages">Сообщения</div>
            <div className="admin__modal_btn" data-tab="about">Обо мне</div>
            <div className="admin__modal_btn" data-tab="portfolio">Портфолио</div>
            <div className="admin__modal_btn" data-tab="users">Пользователи</div>
          </div>
          <div className="admin__modal_tabs">
            <div className="admin__modal_tab messages" data-tab="messages">
              <div className="messages__inner">
                {
                  messages.length > 0 ?
                  messages.map(message => {
                    return (
                      <Message
                        id={message._id}
                        text={
                              `${message.message}
                              Способ связи: ${message.connect}`
                             }
                        from={message.name}
                        onDelete={e => {
                          messages.forEach(message => {
                            if (message._id == e.target.parentNode.parentNode.id) {
                              deleteMessage(message.message);
                              $.removeElement(message, setMessages);
                            };
                          });
                        }}
                      />
                    );
                  }) : ""
                }
              </div>
            </div>
            <div className="admin__modal_tab" data-tab="about" style={{ display: "none" }}>
              <Text text={aboutText} className="about_me_textarea" />
              <Button text="Сохранить" onButton={e => {
                putAboutMeText(document.querySelector(".about_me_textarea").value);
              }} />
            </div>
            <div className="admin__modal_tab portfolio" data-tab="portfolio" style={{ display: "none" }}>
              <div className="portfolio__categories">
                <div className="portfolio__category">Имя проекта</div>
                <div className="portfolio__category">Описание</div>
                <i class="fas fa-plus-circle" onClick={() => setOpenAddWork(true)}></i>
              </div>
              <div className="portfolio__inner">
                <div className="portfolio__inner_scroll">
                  <PortfolioWork
                    id="0"
                    text="YOOF сайт для помощи покупателю найти выгодное предложение для покупки"
                    name="YOOF"
                  />
                </div>
              </div>
            </div>
            <div className="admin__modal_tab" data-tab="users" style={{ display: "none" }}>
              <div className="portfolio__categories">
                <div className="portfolio__category">Имя пользователя</div>
                <div className="portfolio__category" style={{ width: "70%", maxWidth: "67%" }}>Имейл</div>
              </div>
              <div className="portfolio__inner">
                <div className="portfolio__inner_scroll">
                  <Account
                    login="Владислав Зубченко"
                    email="jsih1236@gmail.com"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
