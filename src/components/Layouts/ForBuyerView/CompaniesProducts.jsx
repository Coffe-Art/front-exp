import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../ForView/Header';
import { Footer } from '../ForView/Footer';
import { FaStar } from "react-icons/fa";

export const CompaniesProducts = () => {
    const { codigoempresa } = useParams();
    const [productos, setProductos] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
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
    
            const [productosData] = await response.json();
    
            if (Array.isArray(productosData)) {
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
        navigate('/CompaniesComprador');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-200">
            <Header />
            <div className="flex-1 p-4">
                {loadingMessage && <p className="text-center text-gray-600">{loadingMessage}</p>}
                {error && <p className="text-center text-red-600">{error}</p>}
                {!loadingMessage && !error && (
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {productos.map(product => (
                            <div key={product.idProducto} className="bg-white border rounded-lg overflow-hidden shadow-md flex flex-col items-center p-4">
                                <img
                                    src={`https://imagenes224.blob.core.windows.net/imagenes224/${product.urlProductoImg.split('/').pop()}`}
                                    alt={product.nombre}
                                    className="w-full h-48 object-cover"
                                />
                                <h3 className="text-lg font-semibold mb-2 text-center">{product.nombre}</h3>
                                <p className="text-center"><strong>Publicado por:</strong> {product.publicadoPor}</p>
                                <p className="text-sm text-darkpurple mb-2 text-center">${product.precio}</p>
                                <div className="flex items-center mb-2">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <FaStar
                                            key={star}
                                            className={`text-yellow-500 ${star <= product.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="bg-darkpurple text-white py-2 px-4 rounded hover:bg-purple-700"
                                >
                                    Añadir al Carrito
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};
