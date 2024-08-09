import React, { useEffect, useState, useContext } from 'react';
import { useEmpresa } from '../../Context/contextEmpresa';
import ProductoContext from '../../Context/contextProducto';
import { Header } from './Header';
import { NavLink, useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
import { FaUser, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { FaCoffee } from "react-icons/fa";

export const Companies = () => {
    const { empresas, setEmpresas } = useEmpresa();
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [selectedEmpresa, setSelectedEmpresa] = useState(null);
    const [error, setError] = useState('');
    const { productos, getProductosByCodigoEmpresa } = useContext(ProductoContext);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
            fetchEmpresas(storedUserId);
        } else {
            console.log('No se encontró User ID en localStorage');
        }
    }, []);

    useEffect(() => {
        if (selectedEmpresa) {
            getProductosByCodigoEmpresa(selectedEmpresa.codigoempresa);
        }
    }, [selectedEmpresa, getProductosByCodigoEmpresa]);

    const fetchEmpresas = async (idadministrador) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token de autenticación no encontrado');
            
            const response = await fetch(`https://backtesteo.onrender.com/api/empresa/consultarPorAdministrador/${idadministrador}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                if (response.status === 401) throw new Error('Token de autenticación inválido o expirado');
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const contentType = response.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                if (Array.isArray(data) && Array.isArray(data[0])) {
                    setEmpresas(data[0]);
                } else {
                    throw new Error('Formato de datos inesperado');
                }
            } else {
                const text = await response.text();
                throw new Error('Respuesta no es JSON');
            }
        } catch (error) {
            console.error('Error al obtener empresas:', error.message);
        }
    };

    const viewEmpresa = (empresa) => {
        setSelectedEmpresa(empresa);
        getProductosByCodigoEmpresa(empresa.codigoempresa); 
    };

    const closeEmpresaModal = () => {
        setSelectedEmpresa(null);
    };

    const handleUpdate = (empresa) => {
        navigate(`/updateEmpresa/${empresa.codigoempresa}`);
    };

    const handleDelete = async (codigoempresa) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token de autenticación no encontrado');
            
            const response = await fetch(`https://backtesteo.onrender.com/api/empresa/eliminar/${codigoempresa}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                if (response.status === 401) throw new Error('Token de autenticación inválido o expirado');
                const errorResponse = await response.json();
                if (errorResponse.message) {
                    setError(`Error: ${errorResponse.message}`);
                } else {
                    setError('No se pudo eliminar la empresa. Inténtelo de nuevo más tarde.');
                }
                return;
            }

            setEmpresas(empresas.filter(emp => emp.codigoempresa !== codigoempresa));
            setError('');
        } catch (error) {
            console.error('Error al eliminar empresa:', error.message);
            setError('Error: Hay productos previamente registrados en la página');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-200">
            <Header />
            <div className="container mx-auto my-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <div className="bg-white border rounded-lg overflow-hidden shadow-md flex flex-col items-center p-4 cursor-pointer mb-4">
                    <span className="text-black text-sm text-center">
                        Bienvenido, aquí podrá consultar información sobre sus locales y empresas.<br /><br />
                        Recuerde, no puede borrar una empresa con productos anteriormente registrados en esta, deberá cambiar los productos de empresa o eliminarlos primero.<br /><br />
                        ¡Tenga un feliz día!
                    </span>
                </div>
                {empresas.length === 0 ? (
                    <div className="bg-white border rounded-lg overflow-hidden shadow-md flex flex-col items-center p-4 cursor-pointer">
                        <span className="text-black text-sm text-center">No hay empresas para mostrar</span>
                    </div>
                ) : (
                    empresas.map((empresa) => (
                        <div
                            key={empresa.codigoempresa}
                            className="bg-white border rounded-lg overflow-hidden shadow-md cursor-pointer flex flex-col items-center p-4"
                            onClick={() => viewEmpresa(empresa)}
                        >
                            <h3 className="text-lg font-semibold mb-2 text-center">{empresa.nombre}</h3>
                            <p className="text-center underline text-darkyellow">{empresa.direccion}</p>
                            <p className="text-center line-clamp-5">{empresa.descripcion}</p>
                            <p className="text-center text-gray-600">ID: {empresa.codigoempresa}</p>
                            <div className="flex gap-2 mt-4">
                                <button
                                    className="text-darkyellow hover:text-lightyellow"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdate(empresa);
                                    }}
                                >
                                    <FaEdit className="text-xl" />
                                </button>
                                <button
                                    className="text-red-700 hover:text-red-500"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(empresa.codigoempresa);
                                    }}
                                >
                                    <FaTrash className="text-xl" />
                                </button>
                            </div>
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
            {error && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-brown-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
                    <FaCoffee className="w-6 h-6 mr-2 text-white" />
                    <span> ¡Aún hay productos registrados en la empresa!</span>
                    <button
                        className="ml-4 bg-darkyellow text-white hover:bg-lightyellow"
                        onClick={() => setError('')}
                    >
                        <FaTimes />
                    </button>
                </div>
            )}
            <Footer />
            {selectedEmpresa && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                        <h2 className="text-xl font-bold mb-4">Detalles de la empresa seleccionada</h2>
                        <p><strong>Nombre:</strong> {selectedEmpresa.nombre}</p>
                        <p><strong>Descripción:</strong> {selectedEmpresa.descripcion}</p>
                        <p><strong>Dirección:</strong> {selectedEmpresa.direccion}</p>

                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">Productos registrados</h3>
                            {productos.length > 0 ? (
                                <ul className="list-disc pl-6">
                                    {productos.map((producto) => (
                                        <li key={producto.idproducto}>
                                            <strong>{producto.nombre}</strong> - {producto.descripcion} (Cantidad: {producto.cantidad})
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No hay productos registrados para esta empresa.</p>
                            )}
                        </div>

                        <button
                            className="bg-darkyellow text-white px-4 py-2 rounded-lg mt-4 hover:bg-lightyellow"
                            onClick={closeEmpresaModal}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
