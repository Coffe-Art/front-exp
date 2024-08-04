import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import BackgroundImage from '../../assets/BackgroundLogin.jpg'; 
import { FaHome } from 'react-icons/fa';
import Logo from '../../assets/Artesanías.png';
import Select from 'react-select'; // Asegúrate de instalar react-select

export const EventsForm = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        location: '',
        selectedCompanies: [],
        duration: '',
        place: '',
        description: ''
    });

    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState('');
    const [companies, setCompanies] = useState([]); // Lista de empresas

    useEffect(() => {
        // Aquí deberías hacer una solicitud para obtener las empresas registradas
        const fetchCompanies = async () => {
            try {
                // Simulación de datos
                const response = await fetch('/api/companies'); // Cambia esto por tu endpoint real
                const data = await response.json();
                const companyOptions = data.map(company => ({
                    value: company.id,
                    label: company.name
                }));
                setCompanies(companyOptions);
            } catch (error) {
                console.error('Error al obtener las empresas:', error);
            }
        };
        
        fetchCompanies();
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
            selectedCompanies: selectedOptions
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validaciones
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre del evento es obligatorio';
        }
        if (!formData.date) {
            newErrors.date = 'La fecha es obligatoria';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'La descripción es obligatoria';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                // Aquí iría la lógica para manejar el envío del formulario
                console.log('Event Submitted:', formData);
                setNotification('Evento creado exitosamente');
                setTimeout(() => {
                    setNotification('');
                    navigate('/events'); // Redirige a la página de eventos
                }, 2000); // Muestra la notificación por 2 segundos antes de redirigir
            } catch (error) {
                console.error('Error al crear el evento:', error);
                setNotification('Error al crear el evento, intenta de nuevo');
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
            <div className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-4 sm:mx-8 md:mx-16 lg:mx-32">
                <img src={Logo} alt="Logo" className="h-24 w-24 mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-6 text-center">Agregar Nuevo Evento</h2>
                
                {notification && (
                    <div className={`bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4`} role="alert">
                        <span className="block sm:inline">{notification}</span>
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
                            Nombre del Evento
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nombre del Evento"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="date">
                            Fecha
                        </label>
                        <input
                            type="date"
                            id="date"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.date}
                            onChange={handleChange}
                        />
                        {errors.date && <p className="text-red-500 text-xs italic">{errors.date}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="location">
                            Ubicación
                        </label>
                        <input
                            type="text"
                            id="location"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Ubicación"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="companies">
                            Empresas
                        </label>
                        <Select
                            id="companies"
                            isMulti
                            options={companies}
                            value={formData.selectedCompanies}
                            onChange={handleSelectChange}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="duration">
                            Duración
                        </label>
                        <input
                            type="text"
                            id="duration"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Duración"
                            value={formData.duration}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="place">
                            Lugar
                        </label>
                        <input
                            type="text"
                            id="place"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Lugar"
                            value={formData.place}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="description">
                            Descripción
                        </label>
                        <textarea
                            id="description"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Descripción del Evento"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
                    </div>

                    <button
                        type="submit"
                        className="bg-darkyellow hover:bg-lightyellow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Agregar Evento
                    </button>

                    <p className="mt-4 text-center">
                        <NavLink to="/events" className="text-darkyellow font-bold hover:underline">
                            Regresar a Eventos
                        </NavLink>
                    </p>
                </form>
            </div>
        </div>
    );
};
