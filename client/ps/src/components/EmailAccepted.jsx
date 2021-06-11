import React from "react";
import "./styles/EmailAccepted.css";
import Input from "./Input.jsx";
import Button from "./Button.jsx";

export default function EmailAccepted({ email, openStatus, setOpenStatus  }) {
  return (
    <div className="email_accepted" style={{ display: openStatus ? "block" : "none" }}>
      <h3 className="email_accepted__title">Мы отправили вам письмо с подтверждением на почту {email}</h3>
      <Input placeholder="Код с почты" maxLength="4" className="accepted_email_code" />
      <Button text="Подтвердить" onButton={e => {}} />
      <span className="add_work__exit" onClick={() => setOpenStatus(false)}>Нажмите на ESC или на эту надпись что бы выйти.</span>
    </div>
  );
};
