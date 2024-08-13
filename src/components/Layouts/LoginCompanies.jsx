import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import BackgroundImage from '../../assets/BackgroundLogin.jpg';
import { FaHome } from 'react-icons/fa';
import Logo from '../../assets/Artesanías.png';
import { useEmpresa } from '../../Context/contextEmpresa'; // Importa el hook para usar el contexto

export const LoginCompanies = () => {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [idadministrador, setIdAdministrador] = useState('');
    
    const navigate = useNavigate();
    const { setEmpresas } = useEmpresa(); // Obtén setEmpresas desde el contexto

    useEffect(() => {
        // Obtener el ID del administrador del localStorage
        const storedId = localStorage.getItem('userId');
        if (storedId) {
            setIdAdministrador(storedId);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newEmpresa = {
            nombre,
            direccion,
            descripcion,
            idadministrador
        };

        try {
            const response = await fetch('https://backtesteo.onrender.com/api/empresa/nuevaEmpresa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEmpresa),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                console.error('Error en la creación de la empresa:', errorDetails);
                throw new Error('Error en la creación de la empresa');
            }

            const result = await response.json();
            console.log('Empresa creada exitosamente:', result);

            // Obtén el ID de la nueva empresa
            const empresaId = result.id; 

            // Actualiza la lista de empresas en el contexto
            setEmpresas(prevEmpresas => [
                ...prevEmpresas,
                { id: empresaId, nombre, direccion, descripcion }
            ]);

            // Redirige a la página de empresas
            navigate('/companies');
        } catch (error) {
            console.error('Error al crear la empresa:', error);
        }
    };

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
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="nombre">
                            Nombre de Empresa
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nombre de Empresa"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="direccion">
                            Dirección
                        </label>
                        <input
                            type="text"
                            id="direccion"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Dirección"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="descripcion">
                            Descripción
                        </label>
                        <textarea
                            id="descripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Descripción"
                            required
                        />
                    </div>
                    {/* El campo ID Administrador se ha eliminado del formulario */}
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
