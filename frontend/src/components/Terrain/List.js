import React, {useEffect, useState} from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

export default function List(){
  const [terrains,setTerrains] = useState([]);
  useEffect(()=>{ api.get('/terrains').then(r=>setTerrains(r.data)).catch(()=>alert('Erreur')); },[]);
  return (
    <div>
      <h2>Terrains disponibles</h2>
      {terrains.map(t=>(
        <div key={t.id} style={{border:'1px solid #eee',padding:10,marginBottom:10}}>
          <h3>{t.nom}</h3>
          <p>{t.description}</p>
          <p>Prix / h: {t.prix_par_heure} €</p>
          <Link to={`/terrain/${t.id}`}>Voir / Réserver</Link>
        </div>
      ))}
    </div>
  );
}
