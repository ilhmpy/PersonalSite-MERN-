import React from "react";
import { useState, useEffect } from "react";
import "./styles/Nav.css";
import Query from "../Query.js";

const $ = new Query();

export default function Nav({ access, auth }) {
  const [ token, setToken ] = useState(localStorage.getItem("token"));
  const [ authorization, setAuthorization ] = useState(false);

  useEffect(() => {
    async function getAuthorization() {
      let req = await fetch(`http://localhost:8000/api/users/get-authorization?token=${token}`, {
        method: "GET",
        headers: { "content-type": "application/json" }
      });
      let res = await req.json();
      setAuthorization(res.detail.authorization);
    };

    if (token) {
      getAuthorization();
    }
  }, []);

  function unAuthorization() {
    async function inner() {
      let req = await fetch(`http://localhost:8000/api/users/un-auth?token=${token}`, {
        method: "GET",
        headers: { "content-type": "application/json" }
      });
      let res = await req.json();
      console.log(res);
      if (req.status == 200) $.redirect("/");
    };
    inner();
  };

  return (
    <div className="nav">
      <div className="container">
        <div className="nav__logo" onClick={e => window.location.href = "/"}>ilhmj</div>
        <div className="nav__interface">
          <i class="fas fa-user-cog" style={{ display: access ? "" : "none" }} onClick={e => $.redirect("/admin")}></i>
          <i
            className={authorization ? "fas fa-sign-out-alt" : "fas fa-sign-in-alt" }
            title={authorization ? "Выйти" : "Войти"}
            onClick={e => {
              if (e.target.className == "fas fa-sign-out-alt") {
                unAuthorization();
                return false;
              };
              if (e.target.className == "fas fa-sign-in-alt") {
                $.redirect("/sign")
                return false;
              };
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};
