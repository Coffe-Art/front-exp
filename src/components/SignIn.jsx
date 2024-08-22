import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import BackgroundImage from '../assets/BackgroundLogin.jpg';
import { FaHome } from 'react-icons/fa';
import Logo from '../../src/assets/Artesanías.png';
import { useAuth } from '../Context/contextAuth';

export const SignIn = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'administrador'
    });

    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validaciones
        if (!formData.email.includes('@')) {
            newErrors.email = 'El correo debe contener "@"';
        }
        if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const result = await login(formData.role, formData.email, formData.password);
            
            if (result.success) {
                setNotification('Inicio de sesión exitoso');
                setTimeout(() => {
                    setNotification('');
                    navigate('/');
                }, 2000); // Muestra la notificación por 2 segundos antes de redirigir
            } else {
                // Mostrar el error en la notificación
                setNotification(result.error || 'Error desconocido. Intenta de nuevo.');
            }
        } else {
            setNotification('Por favor corrige los errores en el formulario.');
        }
    };

    return (
        <div 
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{ 
                backgroundImage: `url(${BackgroundImage})`, 
            }}
        >
            <NavLink to="/" className="absolute top-4 left-4">
                <FaHome className="text-darkyellow text-4xl" />
            </NavLink>
            <div className="relative bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-4 sm:mx-8 md:mx-16 lg:mx-32">
                <img src={Logo} alt="Logo" className="h-24 w-24 mx-auto mb-6" />
                <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
                {notification && (
                    <div className={`border px-4 py-3 rounded relative mb-4 ${notification.startsWith('Error') ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700'}`} role="alert">
                        <span className="block sm:inline">{notification}</span>
                    </div>
                )}
                {errors.global && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{errors.global}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Correo Electrónico"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="role">
                            Rol
                        </label>
                        <select
                            id="role"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="administrador">Administrador</option>
                            <option value="empleado">Empleado</option>
                            <option value="comprador">Comprador</option>
                        </select>
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
