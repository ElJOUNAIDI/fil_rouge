import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Terrains from './components/Terrain/List';
import TerrainDetail from './components/Terrain/Detail';
import MyReservations from './components/Reservation/MyReservations';
import AdminDashboard from './components/Admin/AdminDashboard';

function App(){
  return (
    <BrowserRouter>
      <nav style={{padding:'10px',borderBottom:'1px solid #ddd'}}>
        <Link to="/">Terrains</Link> | <Link to="/my">Mes réservations</Link> | <Link to="/admin">Admin</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </nav>
      <div style={{padding:20}}>
        <Routes>
          <Route path="/" element={<Terrains />} />
          <Route path="/terrain/:id" element={<TerrainDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my" element={<MyReservations />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
