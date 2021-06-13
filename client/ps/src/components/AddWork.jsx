import React from "react";
import { useState } from "react";
import "./styles/AddWork.css";
import Query from "../Query.js";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import Text from "./Text.jsx";

const $ = new Query();

export default function AddWork({
                                  onButton, openStatus, setOpenStatus, buttonText = "Добавить", refName = "", refHostingLink = "",
                                  refGithubLink = "", refAbout = "", nameClassName, aboutClassName, linkClassName, hostingLinkClassName
                                }) {
  const [ titleWorkPhoto, setTitleWorkPhoto ] = useState([]);
  const [ workPhotos, setWorkPhotos ] = useState([]);

  return (
    <div className="add_work" style={{ display: openStatus ? "block" : "none" }}>
      <div className="container">
        <input type="file" id="title_img" onChange={e => {
          if (e.target.files[0] != undefined) {
            $.loadPhoto(e.target.files[0], setTitleWorkPhoto, "convert");
          };
        }} style={{ display: "none" }} />
        <input type="file" id="imgs" onChange={e => {
          if (e.target.files != undefined) {
            for (let i of e.target.files) {
              $.convertPhotoToBase64(i, setWorkPhotos);
            };
          };
        }}  style={{ display: "none" }} multiple />
        <div className="add_work__imgs">
          <label htmlFor="title_img" className="add_work__img add_work__img_title" title="Главное фото"><i class="fas fa-camera"></i></label>
          <label htmlFor="imgs" className="add_work__img add_work__img_imgs" title="Все фото"><i class="fas fa-camera"></i></label>
        </div>
        <Input refField={refName} placeholder="Название работы" className={nameClassName} />
        <Text refField={refAbout} placeholder="О проекте" className={aboutClassName} />
        <Input refField={refGithubLink} placeholder="Ссылка на GitHub" className={linkClassName} />
        <Input refField={refHostingLink} placeholder="Ссылка на работу на хостинге" className={hostingLinkClassName} />
        <Button text={buttonText} onButton={e => {
          onButton({
            titlePhoto: titleWorkPhoto,
            photos: workPhotos,
            name: document.querySelector(`.${nameClassName}`).value,
            about: document.querySelector(`.${aboutClassName}`).value,
            gitHubLink: document.querySelector(`.${linkClassName}`).value,
            hostingLink: document.querySelector(`.${hostingLinkClassName}`).value
          });
        }} />
        <span className="add_work__exit" onClick={() => setOpenStatus(false)}>Нажмите на ESC или на эту надпись что бы выйти.</span>
      </div>
    </div>
  );
};
