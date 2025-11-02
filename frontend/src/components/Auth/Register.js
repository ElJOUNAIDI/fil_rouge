import React, {useState} from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [password_confirmation,setPasswordConfirmation]=useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await api.post('/register',{name,email,password,password_confirmation});
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      nav('/');
    } catch(err){
      alert(err.response?.data?.message || JSON.stringify(err.response?.data) || 'Erreur');
    }
  };

  return (
    <form onSubmit={submit}>
      <h3>Créer un compte</h3>
      <input placeholder="Nom" value={name} onChange={e=>setName(e.target.value)} required /><br/>
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required /><br/>
      <input type="password" placeholder="Mot de passe" value={password} onChange={e=>setPassword(e.target.value)} required /><br/>
      <input type="password" placeholder="Confirmer" value={password_confirmation} onChange={e=>setPasswordConfirmation(e.target.value)} required /><br/>
      <button>Créer</button>
    </form>
  );
}
