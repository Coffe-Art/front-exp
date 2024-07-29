import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';
import imageEarring from '../../assets/AretesArtesanales.jpg';
import imageRuana from '../../assets/RuanaArtesanal.jpg';
import imageBracelet from '../../assets/PulserasArtesanales.jpg';
import imageBag from '../../assets/BolsoArtesanal.jpg';

export const Craft = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([
    {
      id: 1,
      vendedor: 'Vendedor A',
      producto: 'Producto A',
      descripcion: 'Descripción del Producto A',
      stock: 10,
      precio: 100,
      imagen: imageEarring
    },
    {
      id: 2,
      vendedor: 'Vendedor B',
      producto: 'Producto B',
      descripcion: 'Descripción del Producto B',
      stock: 5,
      precio: 75,
      imagen: imageRuana
    },
    {
      id: 3,
      vendedor: 'Vendedor C',
      producto: 'Producto C',
      descripcion: 'Descripción del Producto C',
      stock: 3,
      precio: 120,
      imagen: imageBag
    },
    {
      id: 4,
      vendedor: 'Vendedor D',
      producto: 'Producto D',
      descripcion: 'Descripción del Producto D',
      stock: 8,
      precio: 90,
      imagen: imageEarring
    },
    {
      id: 5,
      vendedor: 'Vendedor E',
      producto: 'Producto E',
      descripcion: 'Descripción del Producto E',
      stock: 12,
      precio: 110,
      imagen: imageBracelet
    },
    {
      id: 6,
      vendedor: 'Vendedor F',
      producto: 'Producto F',
      descripcion: 'Descripción del Producto F',
      stock: 6,
      precio: 85,
      imagen: imageEarring
    },
    {
      id: 7,
      vendedor: 'Vendedor G',
      producto: 'Artesanía G',
      descripcion: 'Descripción de la Artesanía G',
      stock: 15,
      precio: 150,
      imagen: imageRuana
    },
    {
      id: 8,
      vendedor: 'Vendedor H',
      producto: 'Artesanía H',
      descripcion: 'Descripción de la Artesanía H',
      stock: 7,
      precio: 95,
      imagen: imageBracelet
    },
    // Agrega más productos/artesanías con imágenes aquí según sea necesario
  ]);
  const navigate = useNavigate();

  const addToCart = (product) => {
    setCart([...cart, product]);
    setProducts(products.map(p => p.id === product.id ? { ...p, stock: p.stock - 1 } : p));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Header />
      <div className="container mx-auto my-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map(product => (
          <div key={product.id} className="bg-white border rounded-lg overflow-hidden shadow-md flex flex-col items-center p-4">
            <img src={product.imagen} alt={product.producto} className="object-cover h-48 w-full mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-center">{product.producto}</h3>
            <p className="text-center"><strong>Vendedor:</strong> {product.vendedor}</p>
            <p className="text-sm text-darkpurple mb-2 text-center"><strong>Descripción:</strong> {product.descripcion}</p>
            <p className="text-center"><strong>Stock:</strong> {product.stock}</p>
            <p className="text-center"><strong>Precio:</strong> ${product.precio}</p>
            <button
              className="mt-4 bg-darkyellow hover:bg-lightyellow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
            </button>
          </div>
        ))}
      </div>
      <Footer />
      <div className="fixed bottom-4 right-4">
        <div className="relative">
          <button
            className="bg-darkpurple text-white p-3 rounded-full shadow-md"
            onClick={() => navigate('/cart')}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m.6 8l1.1 5H19m-7-5a2 2 0 100 4 2 2 0 000-4zm-5 2a2 2 0 100 4 2 2 0 000-4z"
              ></path>
            </svg>
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

