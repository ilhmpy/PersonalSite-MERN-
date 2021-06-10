import React from "react";
import "./styles/Account.css";
import PortfolioWork from "./PortfolioWork.jsx";

export default function Account({ id, login, email }) {
  return (
    <PortfolioWork
      id={id}
      name={login}
      text={email}
    />
  );
};
