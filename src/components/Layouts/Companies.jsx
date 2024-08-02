// src/components/Layouts/Companies.jsx
import React, { useEffect, useState } from 'react';
import { useEmpresa } from '../../Context/contextEmpresa';
import { Header } from './Header';
import { NavLink } from 'react-router-dom';
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';

export const Companies = () => {
    const { empresas, setEmpresas } = useEmpresa();
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            console.log('User ID encontrado en localStorage:', storedUserId);
            setUserId(storedUserId);
            fetchEmpresas(storedUserId);
        } else {
            console.log('No se encontró User ID en localStorage');
        }
    }, []);

    const fetchEmpresas = async (idadministrador) => {
        try {
            const response = await fetch(`https://backtesteo.onrender.com/api/empresa/consultarPorAdministrador/${idadministrador}`);
            const contentType = response.headers.get("content-type");

            console.log('Respuesta del servidor:', response);

            if (!response.ok) {
                throw new Error('Error al obtener empresas');
            }

            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();
                console.log('Datos recibidos del servidor:', data);

                if (Array.isArray(data) && Array.isArray(data[0])) {
                    setEmpresas(data[0]);
                } else {
                    throw new Error('Formato de datos inesperado');
                }
            } else {
                const text = await response.text();
                console.error('Respuesta no es JSON:', text);
                throw new Error('Respuesta no es JSON');
            }
        } catch (error) {
            console.error('Error al obtener empresas:', error);
        }
    };

    const viewEmpresa = (id) => {
        navigate(`/company/${id}`);
    };

    return (
        <div>
            <div className="flex flex-col min-h-screen bg-gray-200">
                <Header />
                <div className="container mx-auto my-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {empresas.length === 0 ? (
                        <div className="bg-white border rounded-lg overflow-hidden shadow-md flex flex-col items-center p-4 cursor-pointer">
                            <div className="flex flex-col items-center">
                                <span className="text-black text-sm text-center">No hay empresas para mostrar</span>
                            </div>
                        </div>
                    ) : (
                        empresas.map(empresa => (
                            <div
                                key={empresa.id}
                                className="bg-white border rounded-lg overflow-hidden shadow-md cursor-pointer flex flex-col items-center p-4"
                                onClick={() => viewEmpresa(empresa.id)}
                            >
                                <h3 className="text-lg font-semibold mb-2 text-center">{empresa.nombre}</h3>
                                <p className="text-center underline text-darkyellow">{empresa.direccion}</p>
                                <p className="text-center line-clamp-5">{empresa.descripcion}</p>
                                <p className="text-center text-gray-600">ID: {empresa.codigoempresa}</p>
                            </div>
                        ))
                    )}
                    <div className="bg-white border rounded-lg overflow-hidden shadow-md flex flex-col items-center p-4 cursor-pointer">
                        <div className="flex flex-col items-center" onClick={() => navigate('/LoginCompanies')}>
                            <svg
                                className="w-8 h-8 mb-2 text-darkyellow"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4v16m8-8H4"
                                ></path>
                            </svg>
                            <span className="text-black text-sm text-center">Agregar una empresa nueva</span>
                            <NavLink to="/LoginCompanies" className="text-darkyellow hover:underline text-sm ml-2">
                                Registrar Empresa
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
