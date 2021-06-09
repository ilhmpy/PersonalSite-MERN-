import React from "react";
import Main from "./pages/Main.jsx";
import PrivateRouter from "./components/PrivateRouter.jsx";
import "./Global.css";

export default function App() {
  return (
    <>
      <PrivateRouter path="/" Component={Main} />
    </>
  );
};