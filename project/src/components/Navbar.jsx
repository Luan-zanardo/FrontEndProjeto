import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    navigate('/auth');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-blue-600 text-white flex justify-between items-center px-6 h-14 shadow-md z-10">
      <div className="font-bold text-lg">Meu Sistema</div>
      <div className="space-x-4">
        <NavLink
          to="/usuarios"
          className={({ isActive }) =>
            isActive ? 'underline' : 'hover:underline'
          }
        >
          Usuários
        </NavLink>
        <NavLink
          to="/servicos"
          className={({ isActive }) =>
            isActive ? 'underline' : 'hover:underline'
          }
        >
          Serviços
        </NavLink>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}