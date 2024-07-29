import React from 'react';
import { NavLink } from 'react-router-dom';
import BackgroundImage from '../../assets/BackgroundLogin.jpg'; 
import { FaHome } from 'react-icons/fa';
import Logo from '../../assets/Artesanías.png';

export const LoginCompanies = () => {

    return (
        <div 
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{ 
                backgroundImage: `url(${BackgroundImage})`, 
            }}
        >
            <NavLink to="/Companies" className="absolute top-4 left-4">
                <FaHome className="text-darkyellow text-4xl" />
            </NavLink>
            <div className="relative bg-white p-5 rounded-lg shadow-md w-full max-w-md mx-4 sm:mx-8 md:mx-16 lg:mx-32">
                <img src={Logo} alt="Logo" className="h-24 w-24 mx-auto mb-6" />
                <h1 className="text-2xl font-bold mb-6 text-center">Registrar Empresa</h1>
                <form>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="username">
                            Nombre de Empresa
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nombre de Empresa"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                            Dirección
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Dirección"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                            Descripción
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Descripción"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-darkyellow hover:bg-lightyellow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Registrar Empresa
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};