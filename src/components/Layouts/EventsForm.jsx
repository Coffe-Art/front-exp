import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import BackgroundImage from '../../assets/BackgroundLogin.jpg'; 
import { FaHome } from 'react-icons/fa';
import Logo from '../../assets/Artesanías.png';
import Select from 'react-select'; // Asegúrate de instalar react-select

export const EventsForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreEvento: '',
    fecha: '',
    ubicacion: '',
    duracion: '',
    lugar: '',
    descripcion: '',
    empresasAsistente: [], // Cambiado para ser un array
    idAdministrador: localStorage.getItem('userId') || '',
  });

  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState('');
  const [empresasOptions, setEmpresasOptions] = useState([]);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const idAdministrador = localStorage.getItem('userId');
        if (idAdministrador) {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('Token de autenticación no encontrado');
          }

          const response = await fetch(`https://backtesteo.onrender.com/api/empresa/consultarPorAdministrador/${idAdministrador}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            if (response.status === 401) {
              throw new Error('Token de autenticación inválido o expirado');
            }
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }

          const contentType = response.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await response.json();
            if (Array.isArray(data) && Array.isArray(data[0])) {
              const empresas = data[0];
              const options = empresas.map((empresa) => ({
                value: empresa.codigoempresa,
                label: empresa.nombre,
              }));
              setEmpresasOptions(options);
            } else {
              throw new Error('Formato de datos inesperado');
            }
          } else {
            const text = await response.text();
            throw new Error('Respuesta no es JSON');
          }
        }
      } catch (error) {
        console.error('Error al obtener empresas:', error.message);
      }
    };

    fetchEmpresas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      empresasAsistente: selectedOptions ? selectedOptions.map(option => option.value) : [], // Manejar como array de valores
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los campos sean cadenas de texto y no estén vacíos
    const requiredFields = ['nombreEvento', 'fecha', 'ubicacion', 'duracion', 'lugar', 'descripcion'];

    const newErrors = {};

    requiredFields.forEach((field) => {
      if (typeof formData[field] !== 'string' || !formData[field].trim()) {
        newErrors[field] = 'Este campo es obligatorio';
      }
    });

    // Verificar que empresasAsistente sea un array y no esté vacío
    if (!Array.isArray(formData.empresasAsistente) || formData.empresasAsistente.length === 0) {
      newErrors.empresasAsistente = 'Debe seleccionar al menos una empresa';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setNotification('Todos los campos son requeridos');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://backtesteo.onrender.com/api/evento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          empresasAsistente: formData.empresasAsistente, // Enviar el array de empresas
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear el evento');
      }

      setNotification('Evento creado exitosamente');
      setTimeout(() => {
        setNotification('');
        navigate('/events'); // Redirige a la página de eventos
      }, 2000);
    } catch (error) {
      console.error('Error al crear evento:', error);
      setNotification('Error al crear el evento, intenta de nuevo');
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
        <h1 className="text-2xl font-bold mb-6 text-center">Crear Nuevo Evento</h1>
        {notification && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{notification}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="nombreEvento">
              Nombre del Evento
            </label>
            <input
              type="text"
              id="nombreEvento"
              name="nombreEvento"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nombre del Evento"
              value={formData.nombreEvento}
              onChange={handleChange}
            />
            {errors.nombreEvento && <p className="text-red-500 text-xs italic">{errors.nombreEvento}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="fecha">
              Fecha
            </label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
              value={formData.fecha}
              onChange={handleChange}
            />
            {errors.fecha && <p className="text-red-500 text-xs italic">{errors.fecha}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="ubicacion">
              Ubicación
            </label>
            <input
              type="text"
              id="ubicacion"
              name="ubicacion"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ubicación del Evento"
              value={formData.ubicacion}
              onChange={handleChange}
            />
            {errors.ubicacion && <p className="text-red-500 text-xs italic">{errors.ubicacion}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="duracion">
              Duración
            </label>
            <input
              type="text"
              id="duracion"
              name="duracion"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Duración del Evento"
              value={formData.duracion}
              onChange={handleChange}
            />
            {errors.duracion && <p className="text-red-500 text-xs italic">{errors.duracion}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="lugar">
              Lugar
            </label>
            <input
              type="text"
              id="lugar"
              name="lugar"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Lugar del Evento"
              value={formData.lugar}
              onChange={handleChange}
            />
            {errors.lugar && <p className="text-red-500 text-xs italic">{errors.lugar}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="descripcion">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Descripción del Evento"
              value={formData.descripcion}
              onChange={handleChange}
            />
            {errors.descripcion && <p className="text-red-500 text-xs italic">{errors.descripcion}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="empresasAsistente">
              Empresas Asistentes
            </label>
            <Select
              id="empresasAsistente"
              isMulti
              options={empresasOptions}
              onChange={handleSelectChange}
              value={empresasOptions.filter(option => formData.empresasAsistente.includes(option.value))}
              placeholder="Selecciona las empresas asistentes"
            />
            {errors.empresasAsistente && <p className="text-red-500 text-xs italic">{errors.empresasAsistente}</p>}
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-darkyellow hover:bg-darkorange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Crear Evento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
