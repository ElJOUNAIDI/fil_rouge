import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Terrains from './components/Terrain/List';
import TerrainDetail from './components/Terrain/Detail';
import MyReservations from './components/Reservation/MyReservations';
import AdminDashboard from './components/Admin/AdminDashboard';
import PrivateRoute from './components/Auth/PrivateRoute';
import Navbar from './components/Layout/Navbar';

// function Navbar() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user'));

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   return (
//     <nav style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
//       <Link to="/">Terrains</Link> |{' '}
//       {user && <Link to="/my">Mes réservations</Link>} |{' '}
//       {user?.roles?.includes('admin') && <Link to="/admin">Admin</Link>} |{' '}
//       {!user && <Link to="/login">Login</Link>} |{' '}
//       {!user && <Link to="/register">Register</Link>}
//       {user && <button onClick={logout} style={{marginLeft:10}}>Déconnexion</button>}
//     </nav>
//   );
// }

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Terrains />} />
          <Route path="/terrain/:id" element={<TerrainDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Réservations : utilisateur connecté */}
          <Route path="/my" element={
            <PrivateRoute>
              <MyReservations />
            </PrivateRoute>
          } />

          {/* Admin : seulement admin */}
          <Route path="/admin" element={
            <PrivateRoute adminOnly={true}>
              <AdminDashboard />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
