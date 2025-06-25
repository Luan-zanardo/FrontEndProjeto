import React from 'react';
import RoutesApp from './routes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  const isLoggedIn = localStorage.getItem('loggedIn');

  return (
    <div className="flex flex-col min-h-screen">
      {isLoggedIn && <Navbar />}
      <main className="flex-grow">
        <RoutesApp />
      </main>
      {isLoggedIn && <Footer />}
    </div>
  );
};

export default App;