import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../ForView/Header';
import { Footer } from '../ForView/Footer';
import { FaCoffee } from "react-icons/fa";

export const CompaniesProducts = () => {
    const { codigoempresa } = useParams(); // Obtener codigoempresa desde la URL
    const [productos, setProductos] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
        console.log('Fetching productos for:', codigoempresa); // Debugging log
        if (codigoempresa) {
            fetchProductos(codigoempresa);
        }
    }, [codigoempresa]);
    
    const fetchProductos = async (codigoempresa) => {
        try {
            setLoadingMessage(`Obteniendo productos para la empresa con código: ${codigoempresa}`);
            
            const response = await fetch(`https://checkpoint-9tp4.onrender.com/api/comprador/ver/empresa/${codigoempresa}`);
    
            if (!response.ok) {
                throw new Error('Error al obtener productos desde el servidor');
            }
    
            const [productosData, _] = await response.json(); // Destructure the nested array
            console.log('API Response:', productosData); // Log the products data
    
            if (Array.isArray(productosData)) {
                console.log('Productos IDs:', productosData.map(producto => producto.idProducto));
                setProductos(productosData);
            } else {
                throw new Error('Los datos de productos no son un array');
            }
    
            setLoadingMessage('');
        } catch (error) {
            setError('Error al obtener productos');
            setLoadingMessage('');
            console.error('Error al obtener productos:', error.message);
        }
    };

    const handleGoHome = () => {
        navigate('/CompaniesComprador'); // Navigate to the homepage
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-200">
            <Header />
            <div className="container mx-auto my-8 flex-grow">
                {loadingMessage && <p className="text-center mb-4 text-darkyellow mt-2">{loadingMessage}</p>}
                {error && <p className="text-center mb-4 text-red-500">{error}</p>}
                <button 
                    onClick={handleGoHome}
                    className="mb-4 px-4 py-2 bg-darkyellow text-white rounded hover:bg-lightyellow "
                >
                    Regresar 
                </button>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {productos.length === 0 ? (
                        <div className="bg-white border rounded-lg overflow-hidden shadow-md flex flex-col items-center p-4">
                            <span className="text-black text-sm text-center">No hay productos para mostrar</span>
                        </div>
                    ) : (
                        productos.map((producto) => (
                            <div
                                key={producto.idProducto} // Ensure this is unique
                                className="bg-white border rounded-lg overflow-hidden shadow-md flex flex-col items-center p-4"
                            >
                                <FaCoffee className="w-6 h-6 text-2xl text-darkyellow" />
                                <p className='text-darkyellow'>{producto.nombreProducto}</p> {/* Use nombreProducto */}
                                <p className="text-center text-gray-600 mb-4">{producto.descripcion}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};
