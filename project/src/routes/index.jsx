import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from '../pages/Auth'
import Usuarios from '../pages/Usuarios';
import Servicos from '../pages/Servicos';

const RoutesApp = () => {
  const isLoggedIn = localStorage.getItem('loggedIn');

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/usuarios" element={isLoggedIn ? <Usuarios /> : <Navigate to="/auth" />} />
      <Route path="/servicos" element={isLoggedIn ? <Servicos /> : <Navigate to="/auth" />} />
    </Routes>
  );
};

export default RoutesApp;