import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Artesanías.png';
import BackgroundImage from '../../assets/FondoHeader.jpg';

export const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <header 
      className="header bg-white shadow p-4 flex flex-col items-center md:flex-row md:justify-between" 
      style={{ 
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="logo-container flex items-center justify-center mx-4 md:mx-8">
        <a href="/#" onClick={handleLogoClick}>
          <img src={Logo} alt="Logo" className="logo h-16 md:h-24 w-16 md:w-24" />
        </a>
      </div>
      <nav className="nav-links flex flex-col items-center md:flex-row md:space-x-4 mt-4 md:mt-0">
        <NavLink 
          to="/Menu" 
          className="nav-link text-white text-lg font-semibold hover:text-darkyellow mb-2 md:mb-0" 
          activeClassName="font-bold"
        >
          Menú
        </NavLink>
        <NavLink 
          to="/History" 
          className="nav-link text-white text-lg font-semibold hover:text-darkyellow mb-2 md:mb-0" 
          activeClassName="font-bold"
        >
          Historias
        </NavLink>
        <NavLink 
          to="/Events" 
          className="nav-link text-white text-lg font-semibold hover:text-darkyellow mb-2 md:mb-0" 
          activeClassName="font-bold"
        >
          Eventos
        </NavLink>
        <NavLink 
          to="/Craft" 
          className="nav-link text-white text-lg font-semibold hover:text-darkyellow mb-2 md:mb-0" 
          activeClassName="font-bold"
        >
          Artesanías
        </NavLink>
        <NavLink 
          to="/Companies" 
          className="nav-link text-white text-lg font-semibold hover:text-darkyellow mb-2 md:mb-0" 
          activeClassName="font-bold"
        >
          Empresas
        </NavLink>
      </nav>
      <div className="flex justify-center mt-4 md:mt-0">
        <button
          className="login-button bg-darkpurple text-white px-4 py-2 rounded hover:bg-lightpurple mx-4 md:mx-8"
          onClick={handleLoginClick}
        >
          Iniciar Sesión
        </button>
      </div>
    </header>
  );
};
