import { useState, useEffect } from 'react';
import RoutesApp from './routes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(logged);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mostra a Navbar apenas se estiver logado */}
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}

      {/* Aplica padding só quando estiver logado */}
      <div className={`flex-grow px-4 ${isLoggedIn ? 'pt-14 pb-16' : ''}`}>
        <RoutesApp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>

      {/* Mostra o Footer apenas se estiver logado */}
      {isLoggedIn && <Footer />}
    </div>
  );
};

export default App;