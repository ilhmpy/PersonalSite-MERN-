import React from "react";
import { useState, useEffect, useRef } from "react";
import "./styles/Admin.css";

import Message from "../components/Message.jsx";
import Text from "../components/Text.jsx";
import Button from "../components/Button.jsx";
import PortfolioWork from "../components/PortfolioWork.jsx";
import AddWork from "../components/AddWork.jsx";
import Account from "../components/Account.jsx";
import Load from "../components/Load.jsx";

import Query from "../Query.js";

const $ = new Query();

export default function Admin() {
  const [ openAddWork, setOpenAddWork ] = useState(false);
  const [ openEdditWork, setOpenEdditWork ] = useState(false);

  const [ aboutText, setAboutText ] = useState("");
  const [ messages, setMessages ] = useState([]);
  const [ works, setWorks ] = useState([]);
  const [ users, setUsers ] = useState([]);
  const [ currentWorkEddit, setCurrentWorkEddit ] = useState([]);

  const refName = useRef(null);
  const refAbout = useRef(null);
  const refHostingLink = useRef(null);
  const refGithubLink = useRef(null);

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
      let res = await req.json();
      if (req.status == 200) setUsers(res.detail);
    };

    async function getWorks() {
      let req = await fetch("http://localhost:8000/api/works/get-works", {
        method: "GET",
        headers: { "content-type": "application/json" }
      });
      let res = await req.json();
      console.log(res.detail);
      if (req.status == 200) setWorks(res.detail);
    };

    getWorks();
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
    };
    inner();
  };

  function postProject(value) {
    async function inner() {
      let req = await fetch("http://localhost:8000/api/works/post-works", {
        method: "POST",
        body: JSON.stringify(value),
        headers: { "content-type": "application/json" }
      });
      let res = await req.json();
    };
    inner();
  };

  function edditWork(value, id) {
    async function inner() {
      let req = await fetch(`http://localhost:8000/api/works/put-works?id=${id}`, {
        method: "PUT",
        body: JSON.stringify(value),
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

  if (works.length > 0) {
    return (
      <div className="admin">
        <AddWork
          openStatus={openAddWork}
          setOpenStatus={setOpenAddWork}
          refName={refName}
          refAbout={refAbout}
          refHostingLink={refHostingLink}
          refGithubLink={refGithubLink}
          nameClassName="name_project"
          aboutClassName="about_project"
          linkClassName="link_project"
          hostingLinkClassName="hosting_link_project"
          onButton={value => {
            postProject(value);
            setOpenAddWork(false);
            $.addElement(value, setWorks);
          }}
        />

        <AddWork
          openStatus={openEdditWork}
          setOpenStatus={setOpenEdditWork}
          refName={refName}
          refAbout={refAbout}
          refHostingLink={refHostingLink}
          refGithubLink={refGithubLink}
          buttonText="Сохранить"
          nameClassName="eddit_name_project"
          aboutClassName="eddit_about_project"
          linkClassName="eddit_link_project"
          hostingLinkClassName="eddit_hosting_link_project"
          onButton={value => {
            $.edditElement(value, currentWorkEddit, works, setWorks);
            edditWork(value, currentWorkEddit._id);
            setOpenEdditWork(false);
          }}
        />
        <div className="admin__modal" style={{ display:  openAddWork || openEdditWork ? "none" : "block" }}>
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
                  <div className="portfolio__category category">Описание</div>
                  <i class="fas fa-plus-circle" onClick={() => setOpenAddWork(true)}></i>
                </div>
                <div className="portfolio__inner">
                  <div className="portfolio__inner_scroll">
                    {
                      works.map(work => {
                        return (
                          <PortfolioWork
                            id={work._id}
                            text={work.about}
                            name={work.name}
                            state={works}
                            set={setWorks}
                            refName={refName}
                            refAbout={refAbout}
                            refHostingLink={refHostingLink}
                            refGithubLink={refGithubLink}
                            setOpenStatus={setOpenEdditWork}
                            current={setCurrentWorkEddit}
                          />
                        );
                      })
                    }
                  </div>
                </div>
              </div>
              <div className="admin__modal_tab" data-tab="users" style={{ display: "none" }}>
                <div className="portfolio__categories">
                  <div className="portfolio__category">Имя пользователя</div>
                  <div className="portfolio__category category" style={{ width: "70%", maxWidth: "67%" }}>Имейл</div>
                </div>
                <div className="portfolio__inner">
                  <div className="portfolio__inner_scroll">
                    {
                      users.map(user => {
                        return (
                          <Account
                            id={user._id}
                            login={user.login}
                            email={user.email}
                          />
                        );
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else return <Load />
};
