import React from "react";
import "./styles/PortfolioWork.css";

export default function PortfolioWork({ name, id, text }) {
  return (
    <div className="portfolio_work" key={id} id={id}>
      <div className="portfolio__category">{name}</div>
      <div className="portfolio__category" style={{ width: "70%", maxWidth: "70%" }}>{text}</div>
    </div>
  );
};
