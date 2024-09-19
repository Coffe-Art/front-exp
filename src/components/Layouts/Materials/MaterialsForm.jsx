import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Select from 'react-select';
import { FaHome } from 'react-icons/fa';
import BackgroundImage from '../../../assets/BackgroundLogin.jpg'; 
import Logo from '../../../assets/Artesanías.png';

export const MaterialsForm = () => {
  const [formData, setFormData] = useState({
    Nombre: '',
    cantidadInsumo: '',
    precioUnitario: '',
    precioPorKilo: '',
    descripcion: '',
    lugarDeVenta: '',
    correoContacto: '',
    TelefonoContacto: '',
    TipoDeVenta: '',
    codigoEmpresa: '',
    idAdministrador: ''
  });
  const [empresasOptions, setEmpresasOptions] = useState([]);
  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState(''); // Añadido para el tipo de notificación
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const idAdministrador = localStorage.getItem('userId');
        if (idAdministrador) {
          setFormData(prevData => ({
            ...prevData,
            idAdministrador: idAdministrador
          }));

          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('Token de autenticación no encontrado');
          }

          const response = await fetch(`https://checkpoint-9tp4.onrender.com/api/empresa/consultarPorAdministrador/${idAdministrador}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
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
              const options = empresas.map(empresa => ({
                value: empresa.codigoempresa, 
                label: empresa.nombre
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Nombre.trim()) {
      newErrors.Nombre = 'El nombre es obligatorio.';
    }

    if (!formData.cantidadInsumo || formData.cantidadInsumo <= 0) {
      newErrors.cantidadInsumo = 'La cantidad debe ser un número positivo.';
    }

    if (!formData.precioUnitario || formData.precioUnitario <= 0) {
      newErrors.precioUnitario = 'El precio unitario debe ser un número positivo.';
    }

    if (!formData.precioPorKilo || formData.precioPorKilo <= 0) {
      newErrors.precioPorKilo = 'El precio por kilo debe ser un número positivo.';
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es obligatoria.';
    }

    if (!formData.lugarDeVenta.trim()) {
      newErrors.lugarDeVenta = 'El lugar de venta es obligatorio.';
    }

    if (!formData.correoContacto.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.correoContacto = 'El correo electrónico no es válido.';
    }

    if (!formData.TelefonoContacto.match(/^\+?[1-9]\d{1,14}$/)) { // Ajusta según el formato requerido
      newErrors.TelefonoContacto = 'El número de teléfono no es válido.';
    }

    if (!formData.TipoDeVenta.trim()) {
      newErrors.TipoDeVenta = 'El tipo de venta es obligatorio.';
    }

    if (!formData.codigoEmpresa) {
      newErrors.codigoEmpresa = 'Debe seleccionar una empresa.';
    }

    if (!formData.idAdministrador) {
      newErrors.idAdministrador = 'ID del administrador es obligatorio.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSelectChange = (selectedOption) => {
    const codigoEmpresa = selectedOption ? selectedOption.value : '';
    setFormData(prevData => ({
      ...prevData,
      codigoEmpresa
    }));
  };

  const showNotification = (message, isError = false) => {
    setNotification(message);
    setNotificationType(isError ? 'error' : 'success');
    setTimeout(() => setNotification(''), 5000); // Clear notification after 5 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showNotification('Por favor, asegúrate de completar correctamente el formulario.', true);
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token de autenticación no encontrado');
      }

      const response = await fetch('https://checkpoint-9tp4.onrender.com/api/insumo/nuevoInsumo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Token de autenticación inválido o expirado');
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (response.status === 201) {
        setNotification('Insumo creado exitosamente');
        setNotificationType('success');
        setFormData({
          Nombre: '',
          cantidadInsumo: '',
          precioUnitario: '',
          precioPorKilo: '',
          descripcion: '',
          lugarDeVenta: '',
          correoContacto: '',
          TelefonoContacto: '',
          TipoDeVenta: '',
          codigoEmpresa: '',
          idAdministrador: formData.idAdministrador
        });
        setTimeout(() => navigate('/MaterialsForAdmin'), 2000);
      } else {
        throw new Error('Error al crear insumo');
      }
    } catch (error) {
      setErrors({ general: error.message });
      showNotification('Por favor, asegúrate de completar correctamente el formulario.', true);
      console.error('Error al enviar los datos:', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ 
        backgroundImage: `url(${BackgroundImage})`, 
      }}
    >
      <NavLink to="/MaterialsForAdmin" className="absolute top-4 left-4">
        <FaHome className="text-darkyellow text-4xl" />
      </NavLink>
      <div className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-4 sm:mx-6 md:mx-10 lg:mx-20">
        <img src={Logo} alt="Logo" className="h-24 w-24 mx-auto mb-6" />
        <h1 className="text-2xl font-bold mb-6 text-center">Crear Nuevo Insumo</h1>
        
        {notification && (
          <div className={`bg-${notificationType === 'error' ? 'red' : 'green'}-100 border border-${notificationType === 'error' ? 'red' : 'green'}-400 text-${notificationType === 'error' ? 'red' : 'green'}-700 px-4 py-3 rounded relative mb-4`} role="alert">
            <span className="block sm:inline">{notification}</span>
          </div>
        )}
        
        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{errors.general}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* Campos del formulario */}
          {Object.keys(formData).map(key => (
            key !== 'idAdministrador' && (
              <div className="mb-4" key={key}>
                <label className="block text-black text-sm font-bold mb-2" htmlFor={key}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
                {key === 'codigoEmpresa' ? (
                  <Select
                    value={empresasOptions.find(option => option.value === formData.codigoEmpresa)}
                    onChange={handleSelectChange}
                    options={empresasOptions}
                    placeholder="Seleccione una empresa"
                  />
                ) : (
                  <input
                    type={key.includes('correo') ? 'email' : key.includes('Telefono') ? 'tel' : 'text'}
                    id={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors[key] ? 'border-red-500' : ''}`}
                    placeholder={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  />
                )}
                {errors[key] && (
                  <p className="text-red-500 text-xs italic">{errors[key]}</p>
                )}
              </div>
            )
          ))}
          
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-darkyellow hover:bg-lightyellow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isSubmitting ? 'Enviando...' : 'Crear Insumo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
