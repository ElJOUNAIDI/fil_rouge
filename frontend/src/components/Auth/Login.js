import React, { useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import imgterain from '../../assets/terain.webp';
import '../../style/Register.css'; // ✅ on réutilise les mêmes classes CSS

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      nav('/');
    } catch (err) {
      alert('Identifiants invalides');
    }
  };

  return (
    <section className="text-center">
      {/* Image d’arrière-plan */}
      <div
        className="p-5 bg-image register-bg"
        style={{ backgroundImage: `url(${imgterain})` }}
      ></div>

      {/* Carte du formulaire */}
      <div className="card mx-4 mx-md-5 shadow-5-strong bg-body-tertiary register-card">
        <div className="card-body py-5 px-md-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-5">Se connecter</h2>

              <form onSubmit={submit}>
                {/* Email */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="formEmail"
                    className="form-control"
                    placeholder="Adresse e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Mot de passe */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="formPassword"
                    className="form-control"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Bouton de connexion */}
                <button type="submit" className="btn btn-primary btn-block mb-4">
                  Se connecter
                </button>

                {/* Liens / Réseaux sociaux */}
                <div className="text-center">
                  <p>Ou connectez-vous avec :</p>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-facebook-f"></i>
                  </button>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-google"></i>
                  </button>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-twitter"></i>
                  </button>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-github"></i>
                  </button>
                </div>

                {/* Lien vers la page d’inscription */}
                <div className="text-center mt-3">
                  <p>
                    Pas encore de compte ?{' '}
                    <a href="/register" className="text-primary">
                      Inscrivez-vous ici
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
