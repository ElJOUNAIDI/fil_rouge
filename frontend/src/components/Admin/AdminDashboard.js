import React, {useEffect, useState} from 'react';
import api from '../../api';

export default function AdminDashboard(){
  const [terrains,setTerrains] = useState([]);
  const [reservations,setReservations] = useState([]);
  const [form,setForm] = useState({nom:'',prix_par_heure:0,description:'',adresse:'',capacite:10});

  const fetch = async () => {
    const t = await api.get('/terrains');
    setTerrains(t.data);
    const r = await api.get('/admin/reservations');
    setReservations(r.data);
  };
  useEffect(()=>{ fetch().catch(()=>{}); },[]);

  const create = async () => {
    try{
      await api.post('/admin/terrains', form);
      alert('Créé');
      fetch();
    } catch(e){ alert('Erreur'); }
  };

  const del = async (id) => {
    if(!window.confirm('Supprimer ?')) return;
    await api.delete(`/admin/terrains/${id}`);
    fetch();
  };

  return (
    <div>
      <h2>Admin — Terrains</h2>
      <div style={{marginBottom:20}}>
        <input placeholder="Nom" value={form.nom} onChange={e=>setForm({...form,nom:e.target.value})} />
        <input placeholder="Prix/h" type="number" value={form.prix_par_heure} onChange={e=>setForm({...form,prix_par_heure:e.target.value})} />
        <button onClick={create}>Créer</button>
      </div>
      {terrains.map(t=>(
        <div key={t.id} style={{border:'1px solid #eee',padding:10,marginBottom:10}}>
          <p>{t.nom} — {t.prix_par_heure} €</p>
          <button onClick={()=>del(t.id)}>Supprimer</button>
        </div>
      ))}

      <h2>Réservations</h2>
      {reservations.map(r=>(
        <div key={r.id} style={{border:'1px solid #eee',padding:10,marginBottom:10}}>
          <p>{r.user.name} — {r.terrain.nom} — {r.date_reservation} {r.heure_debut}-{r.heure_fin}</p>
        </div>
      ))}
    </div>
  );
}
