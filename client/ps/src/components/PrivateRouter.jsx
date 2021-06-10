import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";

export default function PrivateRouter({ path, Component }) {
  const [ access, setAccess ] = useState(true);

  if (path == "/") {
    return (
      <Route
         exact
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
     )
   } else {
     return (
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
      );
   };
};
