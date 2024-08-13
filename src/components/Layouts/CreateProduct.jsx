import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import imageEarring from '../../assets/AretesArtesanales.jpg'; // Añade una imagen predeterminada para los productos nuevos

export const CreateProduct = () => {
  const [form, setForm] = useState({
    vendedor: '',
    producto: '',
    descripcion: '',
    stock: '',
    precio: '',
    imagen: imageEarring
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías enviar los datos del formulario a un servidor o almacenarlos localmente
    // Por ahora, solo navegamos de vuelta a la página de productos
    navigate('/craft');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Header />
      <div className="container mx-auto my-8 p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Crear Nuevo Producto</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="vendedor">Vendedor</label>
            <input
              type="text"
              id="vendedor"
              name="vendedor"
              value={form.vendedor}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="producto">Producto</label>
            <input
              type="text"
              id="producto"
              name="producto"
              value={form.producto}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="precio">Precio</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="imagen">Imagen URL (Opcional)</label>
            <input
              type="text"
              id="imagen"
              name="imagen"
              value={form.imagen}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-darkyellow hover:bg-lightyellow text-white font-bold py-2 px-4 rounded"
          >
            Crear Producto
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};
