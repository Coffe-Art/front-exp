import React, { useState } from 'react';
import { Header } from './Header';
import { NavLink } from 'react-router-dom';
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

    const toggleForm = () => {
        setShowForm(!showForm);
    };

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
        setShowForm(false);
    };

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
                <div className="bg-white border rounded-lg overflow-hidden shadow-md flex flex-col items-center p-4 cursor-pointer">
                    <div className="flex flex-col items-center" onClick={toggleForm}>
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
                </div>
        <Footer />
        </div>
    );
};
