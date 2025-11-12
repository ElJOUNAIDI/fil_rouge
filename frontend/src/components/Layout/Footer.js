import React from "react";
import { Link } from "react-router-dom";
import "../../style/Footer.css";

export default function Footer() {
  return (
    <footer className="footer bg-dark text-white pt-4 pb-3 mt-5">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>PlayGroundPro</h5>
            <p>
              Réservez facilement vos terrains de sport en ligne.  
              Rapide, simple et sécurisé !
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Liens rapides</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="footer-link">Accueil</Link></li>
              <li><Link to="/login" className="footer-link">Connexion</Link></li>
              <li><Link to="/register" className="footer-link">Inscription</Link></li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Contact</h5>
            <p>Email : contact@playgroundpro.com</p>
            <p>Téléphone : +212 6 12 34 56 78</p>
            <div>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="me-3 footer-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="me-3 footer-icon"><i className="fab fa-twitter"></i></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="footer-icon"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <hr className="bg-light" />
        <p className="mb-0">&copy; {new Date().getFullYear()} PlayGroundPro. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
