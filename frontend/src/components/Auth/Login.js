import React, {useState} from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await api.post('/login',{email,password});
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      nav('/');
    } catch(err){
      alert('Identifiants invalides');
    }
  };

  return (
    <form onSubmit={submit}>
      <h3>Se connecter</h3>
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required /><br/>
      <input type="password" placeholder="Mot de passe" value={password} onChange={e=>setPassword(e.target.value)} required /><br/>
      <button>Se connecter</button>
    </form>
  );
}
