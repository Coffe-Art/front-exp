import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import Background from '../../../assets/Fondo.png';

// Inicializa Mercado Pago con tu clave pública y define el idioma
initMercadoPago('TEST-2868a009-6464-42e1-b1a9-3977749af2fa', {
  locale: 'es-CO', // Define el idioma a español (Colombia)
});

export const Cart = () => {
  const navigate = useNavigate();
  const [preferenceId, setPreferenceId] = useState(null);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    // Cargar carrito desde localStorage
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);
    // Crear preferencia al cargar el componente
    crearPreferencia(carritoGuardado);
  }, []);

  const crearPreferencia = async (productos) => {
    try {
      const response = await fetch('http://localhost:3000/api/payment/preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productos),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();
      console.log('ID de preferencia recibido:', data.preferenceId);
      setPreferenceId(data.preferenceId);
    } catch (error) {
      console.error('Error al crear la preferencia de pago:', error);
    }
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'COP' }).format(precio);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex flex-col justify-center items-center flex-grow">
        <div
          className="w-full h-full flex justify-center items-center bg-cover bg-center p-4"
          style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
          }}
        >
          <div className="flex flex-col items-center justify-center text-center p-8 bg-white bg-opacity-70 rounded-lg max-w-lg mx-auto md:max-w-2xl w-full">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Carrito de compras</h1>

            {carrito.length === 0 ? (
              <p className="text-lg">El carrito está vacío.</p>
            ) : (
              <div className="w-full">
                {carrito.map(producto => (
                  <div key={producto.idProducto} className="flex items-center justify-between border-b py-4">
                    <img
                      src={producto.urlProductoImg ? `https://imagenes224.blob.core.windows.net/imagenes224/${producto.urlProductoImg.split('/').pop()}` : 'path_to_default_image'}
                      alt={producto.nombre}
                      className="w-24 h-24 object-cover mr-4"
                    />
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">{producto.nombre}</h2>
                      <p className="text-gray-600">Cantidad: {producto.cantidad}</p>
                      <p className="text-gray-600">{formatearPrecio(producto.precio * producto.cantidad)}</p>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between mt-4 font-bold text-xl">
                  <span>Total:</span>
                  <span>{formatearPrecio(calcularTotal())}</span>
                </div>
              </div>
            )}

            <div className="flex justify-center w-full mt-6">
              <button
                onClick={() => navigate('/CraftComprador')}
                className="bg-darkyellow text-white px-4 py-2 rounded m-1 hover:bg-lightyellow text-xl font-bold"
              >
                Seguir Comprando
              </button>
            </div>

            {/* Mostrar el botón de Mercado Pago */}
            {preferenceId ? (
              <Wallet
                initialization={{ preferenceId }}
                customization={{ texts: { valueProp: 'smart_option' } }}
              />
            ) : (
              <p>Cargando botón de pago...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
