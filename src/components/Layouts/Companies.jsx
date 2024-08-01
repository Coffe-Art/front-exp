import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';

export const Companies = () => {
    const [empresas, setEmpresas] = useState([
        { id: 1, nombre: 'Empresa A', email: 'empresaA@example.com', telefono: '123-456-7890', rol: 'admin', descripcion: 'Descripción de la Empresa A' },
        { id: 2, nombre: 'Empresa B', email: 'empresaB@example.com', telefono: '987-654-3210', rol: 'seller', descripcion: 'Descripción de la Empresa B' },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [rol, setRol] = useState('admin');
    const [descripcion, setDescripcion] = useState('');

    const navigate = useNavigate();

    // Toggle form visibility
    const toggleForm = () => {
        setShowForm(prev => !prev);
    };

    // Add a new company
    const handleAddEmpresa = (e) => {
        e.preventDefault();
        const newEmpresa = {
            id: empresas.length + 1,
            nombre,
            email,
            telefono,
            rol,
            descripcion,
        };
        setEmpresas([...empresas, newEmpresa]);
        setNombre('');
        setEmail('');
        setTelefono('');
        setRol('admin');
        setDescripcion('');
        setShowForm(false); // Hide the form after submission
    };

    // Navigate to company detail view
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
                    <div
                        className="bg-white border rounded-lg overflow-hidden shadow-md flex flex-col items-center p-4 cursor-pointer"
                        onClick={toggleForm}
                    >
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
                        <span className="text-black text-sm text-center">Crear Evento</span>
                    </div>
                </div>

                {/* Conditionally render the form */}
                {showForm && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                            <h2 className="text-xl font-semibold mb-4">Agregar Empresa</h2>
                            <form onSubmit={handleAddEmpresa}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Nombre:</label>
                                    <input
                                        type="text"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Email:</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Teléfono:</label>
                                    <input
                                        type="text"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Rol:</label>
                                    <select
                                        value={rol}
                                        onChange={(e) => setRol(e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="seller">Seller</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Descripción:</label>
                                    <textarea
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                        rows="4"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    ></textarea>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        Agregar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={toggleForm}
                                        className="ml-4 bg-gray-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};
