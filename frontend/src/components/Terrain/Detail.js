import React, {useEffect, useState} from 'react';
import api from '../../api';
import { useParams } from 'react-router-dom';

export default function Detail(){
  const { id } = useParams();
  const [terrain, setTerrain] = useState(null);
  const [date, setDate] = useState('');
  const [start, setStart] = useState('10:00');
  const [end, setEnd] = useState('11:00');
  const [mode, setMode] = useState('cash');

  useEffect(()=>{ api.get(`/terrains/${id}`).then(r=>setTerrain(r.data)).catch(()=>alert('Erreur')); },[id]);

  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Connecte-toi d’abord');
    try{
      await api.post('/reservations',{terrain_id:id,date_reservation:date,heure_debut:start,heure_fin:end,mode_paiement:mode});
      alert('Réservation créée');
    } catch(err){
      alert(err.response?.data?.message || 'Erreur');
    }
  };

  if (!terrain) return <div>Chargement...</div>;

  return (
    <div>
      <h2>{terrain.nom}</h2>
      <p>{terrain.description}</p>
      <p>Prix/h: {terrain.prix_par_heure} €</p>

      <h3>Adresse</h3>
      <p>{terrain.adresse}</p>

      <h3>Réserver</h3>
      <form onSubmit={submit}>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} required /><br/>
        <input type="time" value={start} onChange={e=>setStart(e.target.value)} required />
        <input type="time" value={end} onChange={e=>setEnd(e.target.value)} required /><br/>
        <select value={mode} onChange={e=>setMode(e.target.value)}>
          <option value="cash">Espèces</option>
          {/* <option value="card">Carte</option> */}
        </select><br/>
        <button>Réserver</button>
      </form>
    </div>
  );
}
