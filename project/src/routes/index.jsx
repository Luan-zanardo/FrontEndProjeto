import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from '../pages/Auth';
import Usuarios from '../pages/Usuarios';
import Servicos from '../pages/Servicos';

export default function RoutesApp({ isLoggedIn, setIsLoggedIn }) {
  return (
    <Routes>
      <Route path="/auth" element={<Auth setIsLoggedIn={setIsLoggedIn} />}/>
      <Route path="/usuarios" element={isLoggedIn ? <Usuarios /> : <Navigate to="/auth" replace />}/>
      <Route path="/servicos" element={isLoggedIn ? <Servicos /> : <Navigate to="/auth" replace />}/>
      <Route path="/" element={<Navigate to={isLoggedIn ? "/usuarios" : "/auth"} replace />}/>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}