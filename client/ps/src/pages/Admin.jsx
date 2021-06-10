import React from "react";
import "./styles/Admin.css";
import Message from "../components/Message.jsx";
import Text from "../components/Text.jsx";
import Button from "../components/Button.jsx";
import PortfolioWork from "../components/PortfolioWork.jsx";

export default function Admin() {
  return (
    <div className="admin">
      <div className="admin__modal">
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
                <Message
                  id="0"
                  text="Lorem ipsum dolor sit amet arar lelek ranadara Lorem ipsum dolor sit amet arar lelek ranadara Lorem ipsum dolor sit amet arar lelek ranadara Lorem ipsum dolor sit amet arar lelek ranadara"
                  from="Mike Doe"
                  onDelete={e => {}}
                />
              </div>
            </div>
            <div className="admin__modal_tab" data-tab="about" style={{ display: "none" }}>
              <Text text="" />
              <Button text="Сохранить" onButton={e => {}} />
            </div>
            <div className="admin__modal_tab portfolio" data-tab="portfolio" style={{ display: "none" }}>
              <div className="portfolio__categories">
                <div className="portfolio__category">Имя проекта</div>
                <div className="portfolio__category">Описание</div>
                <i class="fas fa-plus-circle"></i>
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
              users
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
