import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/PlayGroundPro.png'; 
import '../../style/Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-light navbar-light shadow-sm">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="Logo"
            // draggable="false"
          />
        </Link>

        {/* Bouton burger pour mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Liens de navigation */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link mx-2" to="/">
                <i className="fas fa-futbol pe-2"></i>Terrains
              </Link>
            </li>

            {user && (
              <li className="nav-item">
                <Link className="nav-link mx-2" to="/my">
                  <i className="fas fa-calendar-check pe-2"></i>Mes réservations
                </Link>
              </li>
            )}

            {user?.roles?.includes('admin') && (
              <li className="nav-item">
                <Link className="nav-link mx-2" to="/admin">
                  <i className="fas fa-tools pe-2"></i>Admin
                </Link>
              </li>
            )}

            {!user ? (
              <>
                <li className="nav-item ms-3">
                  <Link className="btn btn-dark btn-rounded" to="/login">
                    <i className="fas fa-sign-in-alt pe-2"></i>Login
                  </Link>
                </li>
                <li className="nav-item ms-2">
                  <Link className="btn btn-outline-dark btn-rounded" to="/register">
                    <i className="fas fa-user-plus pe-2"></i>Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item ms-3">
                <button onClick={logout} className="btn btn-danger btn-rounded">
                  <i className="fas fa-sign-out-alt pe-2"></i>Déconnexion
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
