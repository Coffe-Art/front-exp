// src/components/Layouts/Companies.jsx
import React from 'react';
import { useEmpresa } from '../../Context/EmpresaContext'; // Verifica la ruta correcta
import { Header } from './Header';
import { NavLink } from 'react-router-dom';
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';

export const Companies = () => {
    const { empresas } = useEmpresa(); // Obtener empresas del contexto
    const navigate = useNavigate();

    const viewEmpresa = (id) => {
        navigate(`/company/${id}`);
    };

    return (
        <div>
            <div className="flex flex-col min-h-screen bg-gray-200">
                <Header />
                <div className="container mx-auto my-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {empresas.map(empresa => (
                        <div
                            key={empresa.id}
                            className="bg-white border rounded-lg overflow-hidden shadow-md cursor-pointer flex flex-col items-center p-4"
                            onClick={() => viewEmpresa(empresa.id)}
                        >
                            <h3 className="text-lg font-semibold mb-2 text-center">{empresa.nombre}</h3>
                            <p className="text-center">{empresa.descripcion}</p>
                        </div>
                    ))}
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
