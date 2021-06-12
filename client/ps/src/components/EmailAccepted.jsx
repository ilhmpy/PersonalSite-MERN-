import React from "react";
import "./styles/EmailAccepted.css";
import Input from "./Input.jsx";
import Button from "./Button.jsx";

export default function EmailAccepted({ email, code, setCorrect, correct, token, openStatus, setOpenStatus  }) {
  function confirmEmail(token) {
    async function inner() {
      let req = await fetch("http://localhost:8000/api/users/confirm-email", {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: { "content-type": "application/json" }
      });
      let res = await req.json();
      console.log(res);
      if (req.status >= 200 & req.status < 300) setCorrect(true);
      else setCorrect(false);
    };
    inner();
  };

  return (
    <div className="email_accepted" style={{ display: openStatus ? "block" : "none" }}>
      <h3 className="email_accepted__title">Мы отправили вам письмо с подтверждением на почту {email}</h3>
      <Input correct={correct} placeholder="Код с почты" maxLength="4" className="accepted_email_code" />
      <Button text="Подтвердить" onButton={e => {
        if (document.querySelector(".accepted_email_code").value == code) {
          confirmEmail(token);
          setOpenStatus(false);
        };
      }} />
      <span className="add_work__exit" onClick={() => setOpenStatus(false)}>Нажмите на ESC или на эту надпись что бы выйти.</span>
    </div>
  );
};
