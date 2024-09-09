import React, { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// Configura Mercado Pago con tu clave pública
initMercadoPago('TEST-2868a009-6464-42e1-b1a9-3977749af2fa'); // Reemplaza 'YOUR_PUBLIC_KEY' con tu clave pública

const MercadoPagoButton = ({ carrito }) => {
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    // Crear una preferencia de pago cuando el carrito cambia
    const createPreference = async () => {
      try {
        const response = await fetch('/api/payment/create_preference', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: carrito.map(producto => ({
              title: producto.nombre,
              quantity: producto.cantidad,
              unit_price: producto.precio,
              currency_id: 'USD',
            })),
            back_urls: {
              success: 'https://www.tusitio.com/success',
              failure: 'https://www.tusitio.com/failure',
              pending: 'https://www.tusitio.com/pending',
            },
            auto_return: 'approved',
          }),
        });
        const data = await response.json();
        setPreferenceId(data.id);
      } catch (error) {
        console.error('Error al crear la preferencia de pago:', error);
      }
    };

    if (carrito.length > 0) {
      createPreference();
    }
  }, [carrito]);

  return (
    <div>
      {preferenceId ? (
        <div className="mt-6">
          <Wallet initialization={{ preferenceId }} />
        </div>
      ) : (
        <p>Generando enlace de pago...</p>
      )}
    </div>
  );
};

export default MercadoPagoButton;
