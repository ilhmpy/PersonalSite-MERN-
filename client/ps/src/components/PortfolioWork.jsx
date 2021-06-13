import React from "react";
import "./styles/PortfolioWork.css";
import Query from "../Query.js";

const $ = new Query();

export default function PortfolioWork({ name, state, refName, current, refAbout, setOpenStatus, refHostingLink, refGithubLink, set, id, text }) {
  function openMenu(e) {
    if (e.target.className == "portfolio_work" || e.target.className == "portfolio__category") {
      e.preventDefault();
      $.show(e.target.parentNode.querySelector(".portfolio_work__context"));
    };
  };

  function deleteWork(id) {
    async function inner() {
      let req = await fetch(`http://localhost:8000/api/works/delete-works?id=${id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" }
      });
      let res = await req.json();
      console.log(res);
    };
    inner();
  };

  return (
    <div className="portfolio_work" key={id} id={id}
      onContextMenu={e => openMenu(e)}
      onClick={e => openMenu(e)}
    >
      <div className="portfolio__category name">{name}</div>
      <div className="portfolio__category" style={{ width: "70%", maxWidth: "70%" }}>{text}</div>
      <div className="portfolio_work__context"
        onMouseLeave={e => {
          $.hide(".portfolio_work__context");
        }}
        onClick={e => {
          if (e.target.className == "portfolio_work__context_item") {
            if (e.target.dataset.item == "Редактировать") {
              state.forEach(st => {
                if (st._id == e.target.parentNode.parentNode.id) {
                  current(st);
                  refName.current.value = st.name;
                  refAbout.current.value = st.about;
                  refHostingLink.current.value = st.hostingLink;
                  refGithubLink.current.value = st.gitHubLink;
                  setOpenStatus(true);
                };
              })
              return false;
            };

            if (e.target.dataset.item == "Удалить") {
              state.forEach(st => {
                if (st.name == e.target.parentNode.parentNode.querySelector(".name").innerText) {
                  deleteWork(e.target.parentNode.parentNode.id)
                  $.removeElement(st, set);
                };
              });
              return false;
            };
          };
        }}
      >
        <div className="portfolio_work__context_item" data-item="Редактировать">Редактировать</div>
        <div className="portfolio_work__context_item" data-item="Удалить">Удалить</div>
      </div>
    </div>
  );
};
