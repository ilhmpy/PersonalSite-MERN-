import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import Load from "./Load.jsx";

export default function PrivateRouter({ path, Component }) {
  const [ access, setAccess ] = useState(null);
  const [ authorization, setAuthorization ] = useState(null);
  const [ token, setToken ] = useState(localStorage.getItem("token"));

  useEffect(() => {
    async function getLevelAccess() {
      let req = await fetch(`http://localhost:8000/api/users/get-level-access?token=${token}`, {
        method: "GET",
        headers: { "content-type": "application/json" }
      });
      let res = await req.json();
      if (req.status == 200) {
        setAccess(true);
      } else {
        setAccess(false);
      };
    };

    if (token) {
      getLevelAccess();
    };
  }, []);

  if (access != null) {
    if (path == "/") {
      return (
        <Route
           exact
           path={path}
           render={() => {
               return (
                 <React.Fragment>
                    <Nav access={access} auth={authorization} />
                    <Component access={access} auth={authorization} />
                 </React.Fragment>
              );
           }}
          />
       )
     } else {
       return (
         <Route
            path={path}
            render={() => {
              if (path == "/admin" & access == false) return <Redirect from={window.location.href} to="/" />
              else {
                return (
                  <React.Fragment>
                     <Nav access={access} auth={authorization} />
                     <Component access={access} auth={authorization} />
                  </React.Fragment>
                );
              };
            }}
           />
        );
     };
  } else return <Load />
};
