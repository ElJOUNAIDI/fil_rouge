import React, {useEffect, useState} from 'react';
import api from '../../api';

export default function MyReservations(){
  const [res, setRes] = useState([]);
  useEffect(()=>{ api.get('/reservations').then(r=>setRes(r.data)).catch(()=>alert('Erreur')); },[]);
  const del = async (id) => {
    if (!window.confirm('Supprimer ?')) return;
    await api.delete(`/reservations/${id}`);
    setRes(res.filter(x=>x.id !== id));
  };
  return (
    <div>
      <h2>Mes réservations</h2>
      {res.map(r=>(
        <div key={r.id} style={{border:'1px solid #eee',padding:10,marginBottom:10}}>
          <p><strong>{r.terrain?.nom}</strong> — {r.date_reservation} {r.heure_debut}-{r.heure_fin}</p>
          <p>Montant: {r.montant} € — Statut: {r.statut}</p>
          <button onClick={()=>del(r.id)}>Annuler</button>
        </div>
      ))}
    </div>
  );
}
