import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, adminOnly = false }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/login" />; // pas connecté
  if (adminOnly && !user.roles?.includes('admin')) return <Navigate to="/" />; // pas admin

  return children;
}
