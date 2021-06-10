import React from "react";
import { useParams, useHistory } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import "./styles/Works.css";

export default function Works() {
  const { id } = useParams();
  return (
    <>
      <div className="works">
        <div className="container">
          <div className="works__content">
            <h1 className="works__content_title">YOOF</h1>
            <div className="works__content_imgs">
              <img src="" className="works__content_img" />
              <img src="" className="works__content_img" />
              <img src="" className="works__content_img" />
            </div>
            <p className="works__content_text">
              YOOF - сайт который нацелен на помощь людям в поиске самых выгодных предложений. С помощью аукциона.
            </p>
            <div className="works__content_links">
              <a href="#" target="_blank"><i class="fab fa-github"></i></a>
              <a href="#" target="_blank">На хостинге</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
