import React, { useEffect, useState, useContext } from 'react';
import { useEmpresa } from '../../../Context/contextEmpresa';
import ProductoContext from '../../../Context/contextProducto';
import { Header } from '../ForView/Header';
import { Footer } from '../ForView/Footer';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import banner from '../../../assets/FondoMenu.png'; 
import { FaCoffee } from "react-icons/fa";

export const CompaniesComprador = () => {
    const { empresas, setEmpresas } = useEmpresa();
    const { getProductosByCodigoEmpresa } = useContext(ProductoContext);
    const navigate = useNavigate();
    const [selectedEmpresa, setSelectedEmpresa] = useState(null);
    const [error, setError] = useState('');
    const [loadingMessage, setLoadingMessage] = useState(''); // Estado para el mensaje de carga

    useEffect(() => {
        fetchEmpresas();
    }, []);

    const fetchEmpresas = async () => {
        try {
            // Aquí no se usa token de autenticación
            const response = await fetch('https://checkpoint-9tp4.onrender.com/api/comprador/ver/empresas');

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const contentType = response.headers.get("content-type");

            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();
                console.log('Datos recibidos del servidor:', data);

                if (Array.isArray(data[0])) {
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
            console.error('Error al obtener empresas:', error.message);
        }
    };

    const viewEmpresa = async (codigoempresa) => {
        if (!codigoempresa) {
            console.error('codigoempresa no está definido');
            return;
        }

        try {
            setLoadingMessage(`Obteniendo datos de la empresa con código: ${codigoempresa}`); // Establece el mensaje de carga

            // Aquí no se usa token de autenticación
            const response = await fetch(`https://checkpoint-9tp4.onrender.com/api/comprador/ver/empresaAdmin/${codigoempresa}`);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const empresaData = await response.json();
            console.log('Datos de la empresa:', empresaData); 

            // Asegúrate de extraer correctamente los datos relevantes de la empresa
            if (Array.isArray(empresaData) && empresaData.length > 0) {
                const empresa = empresaData[0][0]; // Accede al primer objeto en el primer array
                setSelectedEmpresa(empresa);
            } else {
                console.error('Estructura de datos inesperada');
            }

            setLoadingMessage(''); // Limpia el mensaje de carga después de obtener los datos

        } catch (error) {
            console.error('Error al obtener la información de la empresa:', error.message);
            setLoadingMessage(''); // Limpia el mensaje de carga en caso de error
        }
    };

    const closeEmpresaModal = () => {
        setSelectedEmpresa(null);
        setLoadingMessage(''); // Limpia el mensaje de carga al cerrar la modal
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-200">
            <Header />
            <div className="container mx-auto my-8 flex-grow grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <div className="bg-white border rounded-lg overflow-hidden shadow-md flex flex-col items-center p-4 cursor-pointer mb-4">
                    <div className="flex flex-col items-center justify-center">
                        <svg className="w-6 h-6 mr-2 text-2xl text-darkyellow"><FaCoffee /></svg>
                        <hr className='w-52 h-1 my-3 bg-darkyellow opacity-50 border-0 '/>
                        <span className="text-black text-sm text-center">
                            <br />¡Bienvenido a las empresas! <br /><br />
                            En este apartado podrá observar todas las empresas registradas en la aplicación al igual que podrá visualizar su información y los productos asociados a cada empresa.<br />
                            <br />
                            ¡Tenga un feliz día!
                            <br /><br />
                        </span>
                    </div>
                </div>
                {empresas.length === 0 ? (
                    <div className="bg-white border rounded-lg overflow-hidden shadow-md flex flex-col items-center p-4 cursor-pointer">
                        <div className="flex flex-col items-center">
                            <span className="text-black text-sm text-center">No hay empresas para mostrar</span>
                        </div>
                    </div>
                ) : (
                    empresas.map((empresa) => (
                        <div
                            key={empresa.codigoempresa}
                            className="bg-white border rounded-lg overflow-hidden shadow-md cursor-pointer flex flex-col items-center p-4"
                            onClick={() => viewEmpresa(empresa.codigoempresa)}
                        >
                            <h3 className="text-lg font-semibold mb-2 text-center">{empresa.nombre}</h3>
                            <p className="text-center underline text-darkyellow">{empresa.direccion}</p>
                            <p className="text-center line-clamp-5">{empresa.descripcion}</p>
                            <p className="text-center text-gray-600">ID: {empresa.codigoempresa}</p>
                            <div className="flex gap-32 mt-4">
                                <button
                                    className="text-darkyellow hover:text-lightyellow text-3xl"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // handleUpdate(empresa); // Este método no está definido en el código original
                                    }}
                                >
                                    <FaEdit className="text-xl" />
                                </button>
                                <button
                                    className="text-darkpurple hover:text-lightpurple text-3xl"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // handleDelete(empresa.codigoempresa); // Este método no está definido en el código original
                                    }}
                                >
                                    <FaTrash className="text-xl" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {(selectedEmpresa || loadingMessage) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
                        <div className="relative w-full h-40 bg-gray-300 rounded-t-lg overflow-hidden">
                            <img
                                src={banner}
                                alt="Banner de Empresa"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
                                <h2 className="text-white text-xl font-bold">
                                    {selectedEmpresa ? selectedEmpresa.nombre : 'Cargando...'}
                                </h2>
                            </div>
                        </div>
                        {loadingMessage && (
                            <p className="text-center mb-4 text-darkyellow">{loadingMessage}</p>
                        )}
                        {selectedEmpresa && (
                            <>
                                <h3 className="text-lg font-semibold mb-2 text-center">Información de la empresa</h3>
                                <p className="mb-4">ID: {selectedEmpresa.codigoempresa}</p>
                                <p className="mb-4">Nombre de la Empresa: {selectedEmpresa.nombre_empresa}</p>
                                <p className="mb-4">Descripción: {selectedEmpresa.descripcion}</p>
                                <p className="mb-4">Dirección: {selectedEmpresa.direccion}</p>
                                <p className="mb-4">Fecha de Creación: {new Date(selectedEmpresa.fecha_creacion).toLocaleDateString()}</p>
                                <p className="mb-4">Teléfono: {selectedEmpresa.telefono}</p>
                                <p className="mb-4">Correo Electrónico: {selectedEmpresa.correo_electronico}</p>
                                <p className="mb-4">ID del Administrador: {selectedEmpresa.idadministrador}</p>
                                <p className="mb-4">Nombre del Administrador: {selectedEmpresa.nombre_administrador}</p>
                                <div className="flex justify-end">
                                    <button
                                        className="bg-darkyellow text-white px-4 py-2 rounded"
                                        onClick={closeEmpresaModal}
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};
