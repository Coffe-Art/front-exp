import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Select from 'react-select'; // Asegúrate de tener react-select instalado
import { FaHome } from 'react-icons/fa'; // Importación de FaHome
import BackgroundImage from '../../assets/BackgroundLogin.jpg'; 
import Logo from '../../assets/Artesanías.png';

export const CreateProduct = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        vendedor: '',
        producto: '',
        descripcion: '',
        stock: '',
        precio: '',
        imagen: '', // Agregado valor por defecto
        empresas: [] // Agregado para selección múltiple
    });

    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState('');
    const [empresasOptions, setEmpresasOptions] = useState([]);

    useEffect(() => {
        // Obtén opciones de empresas desde tu API o otra fuente
        const fetchEmpresas = async () => {
            try {
                const response = await fetch('/api/companies'); // Ajusta esta URL a tu endpoint API real
                const data = await response.json();
                const options = data.map(company => ({
                    value: company.id,
                    label: company.name
                }));
                setEmpresasOptions(options);
            } catch (error) {
                console.error('Error al obtener empresas:', error);
            }
        };

        fetchEmpresas();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSelectChange = (selectedOptions) => {
        setFormData((prevData) => ({
            ...prevData,
            empresas: selectedOptions ? selectedOptions.map(option => option.value) : []
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validaciones
        if (!formData.vendedor.trim()) {
            newErrors.vendedor = 'El vendedor es obligatorio';
        }
        if (!formData.producto.trim()) {
            newErrors.producto = 'El nombre del producto es obligatorio';
        }
        if (!formData.descripcion.trim()) {
            newErrors.descripcion = 'La descripción es obligatoria';
        }
        if (formData.stock <= 0) {
            newErrors.stock = 'El stock debe ser un número positivo';
        }
        if (formData.precio <= 0) {
            newErrors.precio = 'El precio debe ser un número positivo';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                // Reemplaza con la lógica real de envío del formulario
                console.log('Datos del formulario:', formData);
                setNotification('Producto creado exitosamente');
                setTimeout(() => {
                    setNotification('');
                    navigate('/craft'); // Navega a la página de productos o a otra página
                }, 2000); // Muestra la notificación durante 2 segundos antes de redirigir
            } catch (error) {
                console.error('Error al crear producto:', error);
                setNotification('Error al crear el producto, intenta de nuevo');
            }
        } else {
            setNotification('');
        }
    };

    return (
        <div 
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{ 
                backgroundImage: `url(${BackgroundImage})`, 
            }}
        >
            <NavLink to="/" className="absolute top-4 left-4">
                <FaHome className="text-darkyellow text-4xl" />
            </NavLink>
            <div className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-4 sm:mx-6 md:mx-10 lg:mx-20">
                <img src={Logo} alt="Logo" className="h-24 w-24 mx-auto mb-6" />
                <h1 className="text-2xl font-bold mb-6 text-center">Crear Nuevo Producto</h1>
                {notification && (
                    <div className={`bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4`} role="alert">
                        <span className="block sm:inline">{notification}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="vendedor">
                            Vendedor
                        </label>
                        <input
                            type="text"
                            id="vendedor"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nombre del Vendedor"
                            value={formData.vendedor}
                            onChange={handleChange}
                        />
                        {errors.vendedor && <p className="text-red-500 text-xs italic">{errors.vendedor}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="producto">
                            Producto
                        </label>
                        <input
                            type="text"
                            id="producto"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nombre del Producto"
                            value={formData.producto}
                            onChange={handleChange}
                        />
                        {errors.producto && <p className="text-red-500 text-xs italic">{errors.producto}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="descripcion">
                            Descripción
                        </label>
                        <textarea
                            id="descripcion"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Descripción del Producto"
                            value={formData.descripcion}
                            onChange={handleChange}
                        />
                        {errors.descripcion && <p className="text-red-500 text-xs italic">{errors.descripcion}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="stock">
                            Stock
                        </label>
                        <input
                            type="number"
                            id="stock"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Cantidad en Stock"
                            value={formData.stock}
                            onChange={handleChange}
                        />
                        {errors.stock && <p className="text-red-500 text-xs italic">{errors.stock}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="precio">
                            Precio
                        </label>
                        <input
                            type="number"
                            id="precio"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Precio del Producto"
                            value={formData.precio}
                            onChange={handleChange}
                        />
                        {errors.precio && <p className="text-red-500 text-xs italic">{errors.precio}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="imagen">
                            Imagen URL (Opcional)
                        </label>
                        <input
                            type="text"
                            id="imagen"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="URL de la Imagen"
                            value={formData.imagen}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="empresas">
                            Empresas
                        </label>
                        <Select
                            isMulti
                            id="empresas"
                            name="empresas"
                            options={empresasOptions}
                            value={empresasOptions.filter(option => formData.empresas.includes(option.value))}
                            onChange={handleSelectChange}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-darkyellow hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Crear Producto
                    </button>
                    <p className="mt-4 text-center">
                        ¿Quieres volver a la página de productos?{' '}
                        <NavLink to="/craft" className="text-darkyellow font-bold hover:underline">
                            Volver
                        </NavLink>
                    </p>
                </form>
            </div>
        </div>
    );
};
