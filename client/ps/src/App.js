import React from "react";
import "./Global.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Main from "./pages/Main.jsx";
import Works from "./pages/Works.jsx";
import Sign from "./pages/Sign.jsx";
import PrivateRouter from "./components/PrivateRouter.jsx";

export default function App() {
  return (
    <>
      <Router>
        <PrivateRouter exact path="/" Component={Main} />
        <PrivateRouter path="/works" Component={Works} />
        <PrivateRouter path="/sign" Component={Sign} />
      </Router>
    </>
  );
};
