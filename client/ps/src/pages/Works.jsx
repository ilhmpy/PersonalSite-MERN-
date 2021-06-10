import React from "react";
import { useParams, useHistory } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import "./styles/Works.css";

export default function Works() {
  const { id } = useParams();
  return (
    <div className="works">
      <div className="container">
        <Footer />
      </div>
    </div>
  );
};
