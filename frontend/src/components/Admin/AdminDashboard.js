import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../../style/AdminDashboard.css'; // 👈 crée ce fichier si pas encore fait

export default function AdminDashboard() {
  const [terrains, setTerrains] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [form, setForm] = useState({
    nom: '',
    prix_par_heure: 0,
    description: '',
    adresse: '',
    capacite: 10,
  });
  const [editForm, setEditForm] = useState(null);

  const fetch = async () => {
    const t = await api.get('/terrains');
    setTerrains(t.data);
    const r = await api.get('/admin/reservations');
    setReservations(r.data);
  };

  useEffect(() => {
    fetch().catch(() => {});
  }, []);

  const create = async () => {
    try {
      await api.post('/admin/terrains', form);
      alert('Terrain créé');
      setForm({ nom: '', prix_par_heure: 0, description: '', adresse: '', capacite: 10 });
      fetch();
    } catch (e) {
      alert('Erreur lors de la création');
    }
  };

  const del = async (id) => {
    if (!window.confirm('Supprimer ce terrain ?')) return;
    await api.delete(`/admin/terrains/${id}`);
    fetch();
  };

  const startEdit = (terrain) => setEditForm({ ...terrain });

  const updateTerrain = async () => {
    try {
      await api.put(`/admin/terrains/${editForm.id}`, editForm);
      alert('Terrain mis à jour');
      setEditForm(null);
      fetch();
    } catch (e) {
      alert('Erreur lors de la mise à jour');
    }
  };

  const updateStatus = async (id, status) => {
    await api.put(`/admin/reservations/${id}/status`, { status });
    fetch();
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Tableau de Bord Administrateur</h2>
        <p>Gérez vos terrains et vos réservations facilement</p>
      </div>

      {/* === FORMULAIRE CRÉATION === */}
      <div className="create-terrain-form">
        <h3>Créer un Terrain</h3>

        <input
          placeholder="Nom du terrain"
          value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
          required
        />
        <input
          placeholder="Prix par heure (€)"
          type="number"
          value={form.prix_par_heure}
          onChange={(e) => setForm({ ...form, prix_par_heure: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          placeholder="Adresse"
          value={form.adresse}
          onChange={(e) => setForm({ ...form, adresse: e.target.value })}
        />
        <input
          placeholder="Capacité"
          type="number"
          value={form.capacite}
          onChange={(e) => setForm({ ...form, capacite: e.target.value })}
        />
        <label>
          <input
            type="checkbox"
            checked={form.actif || false}
            onChange={(e) => setForm({ ...form, actif: e.target.checked })}
          />
          Terrain actif
        </label>

        <button onClick={create}>Créer</button>
      </div>

      {/* === FORMULAIRE MODIFICATION === */}
      {editForm && (
        <div className="edit-terrain-form">
          <h3>Modifier le Terrain</h3>
          <input
            placeholder="Nom"
            value={editForm.nom}
            onChange={(e) => setEditForm({ ...editForm, nom: e.target.value })}
          />
          <input
            placeholder="Prix/h"
            type="number"
            value={editForm.prix_par_heure}
            onChange={(e) => setEditForm({ ...editForm, prix_par_heure: e.target.value })}
          />
          <button onClick={updateTerrain}>Mettre à jour</button>
          <button onClick={() => setEditForm(null)} className="cancel-btn">
            Annuler
          </button>
        </div>
      )}

      {/* === LISTE TERRAINS === */}
      <h2 className="section-title">Terrains</h2>
      <div className="card-container">
        {terrains.map((t) => (
          <div key={t.id} className="admin-card">
            <p>
              <strong>{t.nom}</strong> — {t.prix_par_heure} €
            </p>
            <button onClick={() => startEdit(t)}>Modifier</button>
            <button onClick={() => del(t.id)}>Supprimer</button>
          </div>
        ))}
      </div>

      {/* === LISTE RÉSERVATIONS === */}
      <h2 className="section-title">Réservations</h2>
      <div className="card-container">
        {reservations.map((r) => (
          <div key={r.id} className="admin-card">
            <p>
              <strong>{r.user.name}</strong> — {r.terrain.nom}
            </p>
            <p>
              {r.date_reservation} {r.heure_debut}-{r.heure_fin}
            </p>
            <p>
              Statut : <span className={`status ${r.statut}`}>{r.statut}</span>
            </p>
            {r.statut === 'pending' && (
              <>
                <button onClick={() => updateStatus(r.id, 'completed')}>Valider</button>
                <button onClick={() => updateStatus(r.id, 'rejected')}>Refuser</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
