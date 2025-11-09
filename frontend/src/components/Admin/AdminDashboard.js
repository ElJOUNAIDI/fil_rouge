import React, { useEffect, useState } from 'react';
import api from '../../api';

export default function AdminDashboard() {
  const [terrains, setTerrains] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [form, setForm] = useState({ nom: '', prix_par_heure: 0, description: '', adresse: '', capacite: 10 });
  const [editForm, setEditForm] = useState(null);

  // Charger terrains et réservations
  const fetch = async () => {
    const t = await api.get('/terrains');
    setTerrains(t.data);
    const r = await api.get('/admin/reservations');
    setReservations(r.data);
  };

  useEffect(() => { fetch().catch(() => {}); }, []);

  // Créer un terrain
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

  // Supprimer un terrain
  const del = async (id) => {
    if (!window.confirm('Supprimer ce terrain ?')) return;
    await api.delete(`/admin/terrains/${id}`);
    fetch();
  };

  // Commencer l'édition
  const startEdit = (terrain) => {
    setEditForm({ ...terrain });
  };

  // Enregistrer les modifications
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

  // Mettre à jour le statut d'une réservation
  const updateStatus = async (id, status) => {
    await api.put(`/admin/reservations/${id}/status`, { status });
    fetch();
  };

  return (
    <div>
      <h2>Admin — Terrains</h2>

      {/* Formulaire création terrain */}
      <div style={{ marginBottom: 20, border: '1px solid #ccc', padding: 10 }}>
        <h3>Créer un terrain</h3>

        <input 
            placeholder="Nom" 
            value={form.nom} 
            onChange={e => setForm({ ...form, nom: e.target.value })} 
            style={{ display:'block', marginBottom:5 }} 
        />

        <input 
            placeholder="Prix par heure (€)" 
            type="number" 
            value={form.prix_par_heure} 
            onChange={e => setForm({ ...form, prix_par_heure: e.target.value })} 
            style={{ display:'block', marginBottom:5 }} 
        />

        <textarea 
            placeholder="Description" 
            value={form.description} 
            onChange={e => setForm({ ...form, description: e.target.value })} 
            style={{ display:'block', marginBottom:5 }} 
        />

        <input 
            placeholder="Adresse" 
            value={form.adresse} 
            onChange={e => setForm({ ...form, adresse: e.target.value })} 
            style={{ display:'block', marginBottom:5 }} 
        />

        <input 
            placeholder="Capacité" 
            type="number" 
            value={form.capacite} 
            onChange={e => setForm({ ...form, capacite: e.target.value })} 
            style={{ display:'block', marginBottom:5 }} 
        />

        <label>
            Actif : 
            <input 
            type="checkbox" 
            checked={form.actif || false} 
            onChange={e => setForm({ ...form, actif: e.target.checked })} 
            style={{ marginLeft:5 }}
            />
        </label>

        <button onClick={create} style={{ display:'block', marginTop:10 }}>Créer</button>
        </div>


      {/* Formulaire modification terrain */}
      {editForm && (
        <div style={{ marginBottom: 20, border: '1px solid #ccc', padding: 10 }}>
          <h3>Modifier Terrain</h3>
          <input placeholder="Nom" value={editForm.nom} onChange={e => setEditForm({ ...editForm, nom: e.target.value })} />
          <input placeholder="Prix/h" type="number" value={editForm.prix_par_heure} onChange={e => setEditForm({ ...editForm, prix_par_heure: e.target.value })} />
          <button onClick={updateTerrain}>Enregistrer</button>
          <button onClick={() => setEditForm(null)}>Annuler</button>
        </div>
      )}

      {/* Liste des terrains */}
      {terrains.map(t => (
        <div key={t.id} style={{ border: '1px solid #eee', padding: 10, marginBottom: 10 }}>
          <p>{t.nom} — {t.prix_par_heure} €</p>
          <button onClick={() => startEdit(t)}>Modifier</button>{' '}
          <button onClick={() => del(t.id)}>Supprimer</button>
        </div>
      ))}

      <h2>Réservations</h2>
      {reservations.map(r => (
        <div key={r.id} style={{ border: '1px solid #eee', padding: 10, marginBottom: 10 }}>
          <p>{r.user.name} — {r.terrain.nom} — {r.date_reservation} {r.heure_debut}-{r.heure_fin}</p>
          <p>Status : <strong>{r.statut}</strong></p>
          {r.statut === 'pending' && (
            <>
              <button onClick={() => updateStatus(r.id, 'completed')}>Valider</button>{' '}
              <button onClick={() => updateStatus(r.id, 'rejected')}>Refuser</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
