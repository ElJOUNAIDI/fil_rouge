import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import terain1 from "../../assets/terain1.webp";
import terain2 from "../../assets/terain2.webp";
import terain3 from "../../assets/terain3.webp";
import "../../style/List.css";

export default function List() {
  const [terrains, setTerrains] = useState([]);

  useEffect(() => {
    api
      .get("/terrains")
      .then((r) => setTerrains(r.data))
      .catch(() => alert("Erreur de chargement"));
  }, []);

  // Divise les terrains en groupes de 3 par slide
  const chunkedTerrains = [];
  for (let i = 0; i < terrains.length; i += 3) {
    chunkedTerrains.push(terrains.slice(i, i + 3));
  }

  return (
    <div className="list-page">
      {/* === SLIDER BOOTSTRAP (Images principales) === */}
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide-to="0"
            className="active"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide-to="1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide-to="2"
          ></button>
        </div>

        <div className="carousel-inner rounded-4 shadow">
          {[terain1, terain2, terain3].map((img, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <div className="carousel-overlay"></div>
              <img src={img} className="d-block w-100 carousel-img" alt="" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Réservez votre terrain facilement</h5>
                <p>Choisissez parmi nos meilleurs terrains disponibles.</p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* === SLIDER DE TERRAINS  === */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Terrains disponibles</h2>

        {terrains.length > 0 ? (
          <div
            id="terrainCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {chunkedTerrains.map((group, i) => (
                <div
                  key={i}
                  className={`carousel-item ${i === 0 ? "active" : ""}`}
                >
                  <div className="row">
                    {group.map((t) => (
                      <div key={t.id} className="col-md-4 mb-3">
                        <div className="card h-100 shadow-sm border-0">
                          {/* <img
                            src={t.image || terain1}
                            className="card-img-top"
                            alt={t.nom}
                          /> */}
                          <div className="card-body text-center">
                            <h5 className="card-title">{t.nom}</h5>
                            <p className="card-text text-muted">
                              {t.description}
                            </p>
                            <p className="fw-bold">
                              {t.prix_par_heure} € / h
                            </p>
                            <Link
                              className="btn "
                              to={`/terrain/${t.id}`}
                            >
                              Voir / Réserver
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contrôles du slider */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#terrainCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#terrainCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        ) : (
          <p className="text-center text-muted">Chargement des terrains...</p>
        )}
      </div>
    </div>
  );
}
