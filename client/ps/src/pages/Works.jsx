import React from "react";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Load from "../components/Load.jsx";
import "./styles/Works.css";

export default function Works() {
  const { id } = useParams();
  const [ work, setWork ] = useState({});

  useEffect(() => {
    async function getWorkById() {
      let req = await fetch(`http://localhost:8000/api/works/get-works-by-id?id=${id}`, {
        method: "GET",
        headers: { "content-type": "application/json" }
      });
      let res = await req.json();
      console.log(res);
      if (req.status == 200) setWork(res.detail);
    };

    getWorkById();
  }, []);

  if (work != null & work.photos != null & work.name != null & work.about != null) {
    return (
      <>
        <div className="works">
          <div className="container">
            <div className="works__content">
              <h1 className="works__content_title">{work.name}</h1>
              <div className="works__content_imgs">
                {
                  work.photos != undefined ?
                  work.photos.map(photo => {
                    return (
                      <img src={photo} className="works__content_img" />
                    );
                  }) : ""
                }
              </div>
              <p className="works__content_text">{work.about}</p>
              <div className="works__content_links">
                <a href={work.gitHubLink} target="_blank"><i class="fab fa-github"></i></a>
                <a href={work.hostingLink} target="_blank">На хостинге</a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  } else return <Load />
};
