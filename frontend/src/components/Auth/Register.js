import React, { useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import imgterain from '../../assets/terain.webp';
import '../../style/Register.css'; 

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/register', { name, email, password, password_confirmation });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      nav('/');
    } catch (err) {
      alert(err.response?.data?.message || JSON.stringify(err.response?.data) || 'Erreur');
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
              <h2 className="fw-bold mb-5">Créer un compte</h2>
              <form onSubmit={submit}>
                {/* Champ nom */}
                <div className="row">
                  <div className="col-md-12 mb-4">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="formName"
                        className="form-control"
                        placeholder="Votre nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

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

                {/* Confirmation */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="formConfirmPassword"
                    className="form-control"
                    placeholder="Confirmer le mot de passe"
                    value={password_confirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                  />
                </div>

                {/* Bouton */}
                <button type="submit" className="btn btn-primary btn-block mb-4">
                  S’inscrire
                </button>

                {/* Réseaux sociaux */}
                <div className="text-center">
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
