import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Importar useNavigate
import BackgroundImage from '../assets/BackgroundLogin.jpg';
import { FaHome } from 'react-icons/fa';
import Logo from '../../src/assets/Artesanías.png';
import { useAuth } from '../../src/Context/contextAuth';

export const SignIn = () => {
    const { login } = useAuth();
    const [tipoUsuario, setTipoUsuario] = useState('Administrador');
    const [correo_electronico, setCorreoElectronico] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigate = useNavigate(); // Inicializar useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form with values:', { tipoUsuario, correo_electronico, contrasena });
        try {
            await login(tipoUsuario, correo_electronico, contrasena);
            navigate('/'); // Redirigir al usuario a la página de inicio
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            // Puedes mostrar un mensaje de error aquí si lo deseas
        }
    };

    return (
        <div className="flex items-center justify-center h-screen w-screen fixed top-0 left-0"
            style={{ 
                backgroundImage: `url(${BackgroundImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
            }}
        >
            <NavLink to="/" className="absolute top-4 left-4">
                <FaHome className="text-darkyellow text-4xl" />
            </NavLink>
            <div className="relative bg-white p-12 rounded shadow-md w-full max-w-md">
                <img src={Logo} alt="Logo" className="h-24 w-24 mx-auto mb-6" />
                <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="tipoUsuario">
                            Rol
                        </label>
                        <select
                            id="tipoUsuario"
                            value={tipoUsuario}
                            onChange={(e) => setTipoUsuario(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="administrador">Administrador</option>
                            <option value="comprador">Comprador</option>
                            <option value="empleado">Empleado</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={correo_electronico}
                            onChange={(e) => setCorreoElectronico(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Correo Electrónico"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Contraseña"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-darkyellow hover:bg-lightyellow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <span className="text-black text-sm">¿Aún no tienes una cuenta?</span>
                    <NavLink to="/Register" className="text-darkyellow hover:underline text-sm ml-2">
                        Crear cuenta
                    </NavLink>
                </div>
            </div>
        </div>
    );
};