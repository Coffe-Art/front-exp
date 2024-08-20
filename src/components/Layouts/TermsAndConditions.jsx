import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Image from '../../assets/LogoCoffe.png';

export const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col md:flex-row">
      {/* Sección de la Imagen de Cabecera */}
      <div className="w-full md:w-1/3 bg-darkpurple flex items-center justify-center relative">
        <NavLink to="/History" className="absolute top-4 left-4">
          <FaHome className="text-darkyellow text-4xl" />
        </NavLink>
        <img 
          src={Image} 
          alt="HeaderMain" 
          className="w-11/12 h-auto max-w-2xl p-4" // Ancho aumentado al 11/12
          style={{ imageRendering: 'auto' }} // Asegura una buena calidad de imagen
        />
      </div>

      {/* Sección de Contenido de Términos y Condiciones */}
      <div className="w-full md:w-2/3 bg-gray-200 flex flex-col justify-center p-8">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-8 text-darkpurple">
            Términos y Condiciones
          </h1>
          
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
            Bienvenido a Coffee Art. Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de Coffee Art.
          </p>
          
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-darkpurple">
            Sección 1: Introducción
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
            Al acceder a este sitio web asumimos que aceptas estos términos y condiciones en su totalidad. No continúes usando Coffee Art si no aceptas todos los términos y condiciones establecidos en esta página.
          </p>
          
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-darkpurple">
            Sección 2: Licencia
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
            A menos que se indique lo contrario, Coffee Art y/o sus licenciatarios poseen los derechos de propiedad intelectual de todo el material en Coffee Art. Todos los derechos de propiedad intelectual están reservados.
          </p>
          
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-darkpurple">
            Sección 3: Hipervínculos a Nuestro Contenido
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Las siguientes organizaciones pueden enlazar a nuestro sitio web sin aprobación previa por escrito: Agencias gubernamentales; Motores de búsqueda; Organizaciones de noticias...
          </p>
        </div>
      </div>
    </div>
  );
};