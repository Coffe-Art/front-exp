import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import BackgroundImage from '../assets/BackgroundLogin.jpg'; 
import { FaHome } from 'react-icons/fa';
import Logo from '../../src/assets/Artesanías.png';
import { useAuth } from '../Context/contextAuth'; // Ensure correct import

export const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth(); // Ensure useAuth provides register
    const [nombre, setNombre] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('comprador'); // Default value in lowercase

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (contrasena !== confirmarContrasena) {
            console.error('Las contraseñas no coinciden');
            return;
        }

        try {
            await register(tipoUsuario, nombre, correoElectronico, contrasena);
            navigate('/login'); // Redirect to the login page after registration
        } catch (error) {
            console.error('Error al intentar registrar el usuario:', error);
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
                <h1 className="text-2xl font-bold mb-6 text-center">Registrarse</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="nombre">
                            Nombre Completo
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nombre Completo"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={correoElectronico}
                            onChange={(e) => setCorreoElectronico(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Correo Electrónico"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Contraseña"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirmar Contraseña
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmarContrasena}
                            onChange={(e) => setConfirmarContrasena(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Confirmar Contraseña"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="tipoUsuario">
                            Tipo de Usuario
                        </label>
                        <select
                            id="tipoUsuario"
                            value={tipoUsuario}
                            onChange={(e) => setTipoUsuario(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="comprador">Comprador</option>
                            <option value="empleado">Empleado</option>
                            <option value="administrador">Administrador</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <button
                            type="submit"
                            className="bg-darkyellow text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Registrarse
                        </button>
                    </div>
                </form>
                <p className="text-center text-black">
                    ¿Ya tienes una cuenta?{' '}
                    <NavLink to="/login" className="text-darkyellow">
                        Iniciar sesión
                    </NavLink>
                </p>
            </div>
        </div>
    );
};
