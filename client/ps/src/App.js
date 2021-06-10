import React from "react";
import Main from "./pages/Main.jsx";
import Works from "./pages/Works.jsx";
import PrivateRouter from "./components/PrivateRouter.jsx";
import "./Global.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Router>
        <PrivateRouter exact path="/" Component={Main} />
        <PrivateRouter path="/works" Component={Works} />
      </Router>
    </>
  );
};
