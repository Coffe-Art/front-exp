import React, { useEffect, useState, useContext } from 'react';
import { useEmpresa } from '../../../Context/contextEmpresa';
import ProductoContext from '../../../Context/contextProducto';
import { Header } from '../ForView/Header';
import { Footer } from '../ForView/Footer';
import banner from '../../../assets/FondoEmpresas.png'; 
import { FaCoffee } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';

export const CompaniesComprador = () => {
    const { empresas, setEmpresas } = useEmpresa();
    const { getProductosByCodigoEmpresa } = useContext(ProductoContext);
    const navigate = useNavigate();
    const [selectedEmpresa, setSelectedEmpresa] = useState(null);
    const [error, setError] = useState('');
    const [loadingMessage, setLoadingMessage] = useState('');

    useEffect(() => {
        fetchEmpresas();
    }, []);

    const fetchEmpresas = async () => {
        try {
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
            setLoadingMessage(`Obteniendo datos de la empresa con código: ${codigoempresa}`);

            const response = await fetch(`https://checkpoint-9tp4.onrender.com/api/comprador/ver/empresaAdmin/${codigoempresa}`);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const empresaData = await response.json();
            console.log('Datos de la empresa:', empresaData); 

            if (Array.isArray(empresaData) && empresaData.length > 0) {
                const empresa = empresaData[0][0];
                setSelectedEmpresa(empresa);
            } else {
                console.error('Estructura de datos inesperada');
            }

            setLoadingMessage('');

        } catch (error) {
            console.error('Error al obtener la información de la empresa:', error.message);
            setLoadingMessage('');
        }
    };

    const closeEmpresaModal = () => {
        setSelectedEmpresa(null);
        setLoadingMessage(''); 
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex flex-col flex-grow p-4">
                <section className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-darkyellow mt-5 mb-8 text-center">¡Bienvenido a empresas!</h1>
                    <p className="text-gray-700 text-base md:text-lg mx-auto max-w-4xl">
                        En esta sección, podrás explorar todas las empresas registradas en la aplicación. No solo podrás ver la información básica de cada empresa, sino que también tendrás acceso a una lista completa de los productos que están vinculados a ellas. Esto te permitirá tener una visión clara y completa de todo lo que ocurre en la plataforma.
                    </p>
                    <br></br>
                    <p className="text-gray-700 text-base md:text-lg mx-auto max-w-4xl font-bold">¡Le deseamos un excelente y productivo día!</p>
                </section>
                <section className="container mx-auto grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {empresas.length === 0 ? (
                        <div className="bg-white border rounded-lg overflow-hidden shadow-md flex flex-col items-center p-4">
                            <p className="text-gray-700 text-center">No hay empresas para mostrar</p>
                        </div>
                    ) : (
                        empresas.map((empresa) => (
                            <div
                                key={empresa.codigoempresa}
                                className="bg-white border rounded-lg overflow-hidden shadow-md cursor-pointer flex flex-col items-center p-4 transition-transform transform hover:scale-105"
                                onClick={() => viewEmpresa(empresa.codigoempresa)}
                            >
                                <FaCoffee className="text-3xl text-darck mb-2" />
                                <h2 className='text-darkyellow text-xl font-semibold mb-2'>{empresa.nombre}</h2>
                                <hr className='w-3/4 my-2 bg-darkyellow opacity-50 border-0' />
                                <p className="text-gray-600 mb-2 text-center">{empresa.direccion}</p>
                                <p className="text-gray-600 mb-2 text-center line-clamp-3">{empresa.descripcion}</p>
                                <p className="text-gray-600 text-sm text-center">ID: {empresa.codigoempresa}</p>
                            </div>
                        ))
                    )}
                </section>
                {(selectedEmpresa || loadingMessage) && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
                            <div className="relative w-full h-40 bg-gray-300 rounded-t-lg overflow-hidden">
                                <img src={banner} alt="Banner de Empresa" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                                    <h2 className="text-white text-2xl md:text-3xl font-bold">
                                        {selectedEmpresa ? selectedEmpresa.nombre_empresa : 'Cargando...'}
                                    </h2>
                                </div>
                            </div>
                            {loadingMessage && (
                                <p className="text-center mb-4 text-darkyellow mt-2">{loadingMessage}</p>
                            )}
                            {selectedEmpresa && (
                                <div className='flex flex-col space-y-4'>
                                    <p><span className='font-bold'>ID de la Empresa:</span> {selectedEmpresa.codigoempresa}</p>
                                    <p><span className='font-bold'>Nombre de la Empresa:</span> {selectedEmpresa.nombre_empresa}</p>
                                    <p><span className='font-bold'>Descripción:</span> {selectedEmpresa.descripcion}</p>
                                    <p><span className='font-bold'>Dirección:</span> {selectedEmpresa.direccion}</p>
                                    <p><span className='font-bold'>Fecha de Creación:</span> {new Date(selectedEmpresa.fecha_creacion).toLocaleDateString()}</p>
                                    <p><span className='font-bold'>Teléfono:</span> {selectedEmpresa.telefono}</p>
                                    <p><span className='font-bold'>Correo Electrónico:</span> {selectedEmpresa.correo_electronico}</p>
                                    <p><span className='font-bold'>Nombre del Encargado:</span> {selectedEmpresa.nombre_administrador}</p>
                                    <NavLink
                                        to={`/CompaniesProducts/${selectedEmpresa.codigoempresa}`}
                                        className="bg-transparent text-darkyellow rounded text-lg font-semibold underline block text-center"
                                    >
                                        Ver productos
                                    </NavLink>
                                    <div className="flex justify-center mt-5">
                                        <button
                                            onClick={closeEmpresaModal}
                                            className="bg-gray-300 text-gray-800 py-2 px-4 rounded"
                                        >
                                            Cerrar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};
