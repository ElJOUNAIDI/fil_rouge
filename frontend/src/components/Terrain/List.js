import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import terain1 from '../../assets/terain1.webp';
import terain2 from '../../assets/terain2.webp';
import terain3 from '../../assets/terain3.webp';
import '../../style/List.css'; 

export default function List() {
  const [terrains, setTerrains] = useState([]);

  useEffect(() => {
    api.get('/terrains')
      .then((r) => setTerrains(r.data))
      .catch(() => alert('Erreur de chargement'));
  }, []);

  return (
    <div className="list-page">
      {/* === SLIDER BOOTSTRAP === */}
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        {/* Indicateurs */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        {/* Images */}
        <div className="carousel-inner rounded-4 shadow">
          <div className="carousel-item active">
            <div className="carousel-overlay"></div>
            <img src={terain1} className="d-block w-100 carousel-img" alt="Terrain 1" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Réservez votre terrain facilement</h5>
              <p>Choisissez parmi nos meilleurs terrains disponibles.</p>
            </div>
          </div>

          <div className="carousel-item">
            <div className="carousel-overlay"></div>
            <img src={terain2} className="d-block w-100 carousel-img" alt="Terrain 2" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Qualité et confort</h5>
              <p>Des installations modernes pour vos matchs.</p>
            </div>
          </div>

          <div className="carousel-item">
            <div className="carousel-overlay"></div>
            <img src={terain3} className="d-block w-100 carousel-img" alt="Terrain 3" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Réservez en un clic</h5>
              <p>Jouez quand vous voulez, où vous voulez.</p>
            </div>
          </div>
        </div>

        {/* Contrôles */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Précédent</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Suivant</span>
        </button>
      </div>

      {/* === LISTE DES TERRAINS === */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Terrains disponibles</h2>

        {terrains.map((t) => (
          <div key={t.id} className="terrain-card border rounded p-3 mb-3 shadow-sm bg-light">
            <h4>{t.nom}</h4>
            <p>{t.description}</p>
            <p><strong>Prix / h :</strong> {t.prix_par_heure} €</p>
            <Link className="btn btn-primary" to={`/terrain/${t.id}`}>Voir / Réserver</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
