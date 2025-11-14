import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../../style/MyReservations.css'; 

export default function MyReservations() {
  const [res, setRes] = useState([]);

  useEffect(() => {
    api.get('/reservations')
      .then(r => setRes(r.data))
      .catch(() => alert('Erreur lors du chargement'));
  }, []);

  const del = async (id) => {
    if (!window.confirm('Supprimer cette réservation ?')) return;
    await api.delete(`/reservations/${id}`);
    setRes(res.filter(x => x.id !== id));
  };

  return (
    <div className="my-reservations">
      <div className="header-section">
        <h2>Mes Réservations</h2>
        <p>Consultez et gérez vos réservations facilement</p>
      </div>

      {res.length === 0 ? (
        <p className="empty-text">Aucune réservation trouvée.</p>
      ) : (
        <div className="reservations-list">
          {res.map(r => (
            <div key={r.id} className="reservation-card">
              <div className="reservation-info">
                <h3>{r.terrain?.nom}</h3>
                <p>
                  <strong>Date :</strong> {r.date_reservation} <br />
                  <strong>Heure :</strong> {r.heure_debut} - {r.heure_fin}
                </p>
                <p>
                  <strong>Montant :</strong> {r.montant} € <br />
                  <strong>Statut :</strong> <span className={`status ${r.statut}`}>{r.statut}</span>
                </p>
              </div>
              <button className="cancel-btn" onClick={() => del(r.id)}>Annuler</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
