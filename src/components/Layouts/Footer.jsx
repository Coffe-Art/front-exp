import React from 'react';
import { FaInstagram, FaPinterestP, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-darkpurple text-white py-4">
      <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between px-4">
        <nav className="flex flex-col items-center md:flex-row md:space-x-4">
          <NavLink
            to="/contacto"
            className="text-lg font-semibold m-2 md:m-4 hover:text-lightyellow"
            activeClassName="font-bold"
          >
            Contacto
          </NavLink>
          <NavLink
            to="/direccion"
            className="text-lg font-semibold m-2 md:m-4 hover:text-lightyellow"
            activeClassName="font-bold"
          >
            Dirección
          </NavLink>
          <NavLink
            to="/terminos"
            className="text-lg font-semibold m-2 md:m-4 hover:text-lightyellow"
            activeClassName="font-bold"
          >
            Términos y condiciones
          </NavLink>
        </nav>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300">
            <FaInstagram className="text-2xl" />
          </a>
          <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300">
            <FaPinterestP className="text-2xl" />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300">
            <FaYoutube className="text-2xl" />
          </a>
          <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300">
            <FaWhatsapp className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

