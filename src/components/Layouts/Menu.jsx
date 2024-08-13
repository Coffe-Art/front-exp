import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import Logo from '../../assets/Artesanías.png';
import BackgroundImage from '../../assets/FondoMenu.png';
import Background from '../../assets/Fondo.png';

export const Menu = () => {
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/#');
  };

  const handleLoginClick = () => {
    navigate('/#');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <div className="md:w-1/5 lg:w-1/6 bg-cover bg-center p-4 text-white flex flex-col items-center justify-center" style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', margin: '0' }}>
        <a href="/#" onClick={handleLogoClick} className="mb-6">
          <img src={Logo} alt="Logo" className="h-32 w-32" style={{ margin: '0' }} />
        </a>
        <nav className="flex flex-col items-center space-y-6">
          <NavLink to="/menu" className="text-xl md:text-2xl text-white hover:text-darkyellow font-bold">Bienvenido</NavLink>
          <NavLink to="/profile" className="text-xl md:text-2xl text-white hover:text-darkyellow font-bold">Perfil</NavLink>
          <NavLink to="/product" className="text-xl md:text-2xl text-white hover:text-darkyellow font-bold">Producto</NavLink>
          <NavLink to="/help" className="text-xl md:text-2xl text-white hover:text-darkyellow font-bold">Ayuda</NavLink>
          <button
            className="bg-darkyellow text-white px-4 py-2 rounded hover:bg-lightyellow mt-4 text-lg font-bold"
            onClick={handleLoginClick}
          >
            Regresar
          </button>
        </nav>
      </div>
      <div className="flex flex-col justify-center items-center md:w-4/5 lg:w-5/6">
        <div className="w-full h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="flex flex-col items-center justify-center text-center p-8 bg-white bg-opacity-80 rounded-lg max-w-lg mx-auto md:max-w-2xl w-full">
            <FaRegUserCircle className="h-20 w-20 text-gray-800 mb-4" />
            <h1 className="text-black text-3xl md:text-4xl font-bold mb-4">¡Bienvenido!</h1>
            <p className="text-gray-800 text-lg mb-6">Gracias por visitar nuestro espacio para ti. Inicia sesión para disfrutar de todas las funcionalidades que tiene Coffe Art.</p>
            <NavLink to="/login" className="bg-darkyellow text-white px-6 py-3 rounded hover:bg-lightyellow text-lg font-bold">Iniciar sesión</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};