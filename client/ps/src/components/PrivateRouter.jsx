import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Nav.jsx";

export default function PrivateRouter({ path, Component }) {
  return (
    <Router>
      <Route
         path={path}
         render={() => {
           return (
             <React.Fragment>
                <Nav />
                <Component />
             </React.Fragment>
           );
         }}
      />
    </Router>
  );
};
