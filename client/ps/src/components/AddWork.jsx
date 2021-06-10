import React from "react";
import "./styles/AddWork.css";
import Query from "../Query.js";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import Text from "./Text.jsx";

const $ = new Query();

export default function AddWork({ onButton, openStatus, setOpenStatus }) {
  return (
    <div className="add_work" style={{ display: openStatus ? "block" : "none" }}>
      <div className="container">
        <input type="file" id="title_img" onChange={e => {}} style={{ display: "none" }} />
        <input type="file" id="imgs" onChange={e => {}}  style={{ display: "none" }} multiple />
        <div className="add_work__imgs">
          <label htmlFor="title_img" className="add_work__img add_work__img_title" title="Главное фото"><i class="fas fa-camera"></i></label>
          <label htmlFor="imgs" className="add_work__img add_work__img_imgs" title="Все фото"><i class="fas fa-camera"></i></label>
        </div>
        <Input placeholder="Название работы" className="name_project" />
        <Text placeholder="О проекте" className="about_project" />
        <Input placeholder="Ссылка на GitHub" className="link_project" />
        <Input placeholder="Ссылка на работу на хостинге" className="hosting_link_project" />
        <Button text="Добавить" onButton={e => {}} />
        <span className="add_work__exit" onClick={() => setOpenStatus(false)}>Нажмите на ESC или на эту надпись что бы выйти.</span>
      </div>
    </div>
  );
};
