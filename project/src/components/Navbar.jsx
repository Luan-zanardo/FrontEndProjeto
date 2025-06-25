import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setIsLoggedIn(false);
    navigate('/auth');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-700 to-blue-500 text-white flex items-center justify-between px-6 h-16 shadow-lg z-10">
      <div className="text-2xl font-extrabold tracking-wide select-none cursor-default">
        Gerenciador<span className="text-yellow-300">360</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex space-x-3 bg-blue-100 bg-opacity-30 rounded-lg p-1 shadow-inner">
          <NavLink
            to="/usuarios"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
                isActive
                  ? 'bg-yellow-400 text-blue-900 shadow-md'
                  : 'text-white hover:bg-yellow-300 hover:text-blue-900'
              }`
            }
          >
            Usuários
          </NavLink>

          <NavLink
            to="/servicos"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
                isActive
                  ? 'bg-yellow-400 text-blue-900 shadow-md'
                  : 'text-white hover:bg-yellow-300 hover:text-blue-900'
              }`
            }
          >
            Serviços
          </NavLink>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 shadow-md font-semibold transition-colors duration-200"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}