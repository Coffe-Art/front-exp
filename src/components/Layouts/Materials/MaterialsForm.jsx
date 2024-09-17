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
    telefonoContacto: '',
    tipoDeVenta: '',
    codigoEmpresa: '',
    idAdministrador: ''
  });
  const [empresasOptions, setEmpresasOptions] = useState([]);
  const [notification, setNotification] = useState('');
  const [errors, setErrors] = useState({});
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        setFormData({
          Nombre: '',
          cantidadInsumo: '',
          precioUnitario: '',
          precioPorKilo: '',
          descripcion: '',
          lugarDeVenta: '',
          correoContacto: '',
          telefonoContacto: '',
          tipoDeVenta: '',
          codigoEmpresa: '',
          idAdministrador: formData.idAdministrador
        });
        setTimeout(() => navigate('/MaterialsForAdmin'), 2000);
      } else {
        throw new Error('Error al crear insumo');
      }
    } catch (error) {
      setErrors({ general: error.message });
      console.error('Error al enviar los datos:', error.message);
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
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{notification}</span>
          </div>
        )}
        
        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{errors.general}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="Nombre">
              Nombre
            </label>
            <input
              type="text"
              id="Nombre"
              name="Nombre"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nombre del Insumo"
              value={formData.Nombre}
              onChange={handleChange}
            />
            {errors.Nombre && <p className="text-red-500 text-xs italic">{errors.Nombre}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="cantidadInsumo">
              Cantidad
            </label>
            <input
              type="number"
              id="cantidadInsumo"
              name="cantidadInsumo"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
              value={formData.cantidadInsumo}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="precioUnitario">
              Precio Unitario
            </label>
            <input
              type="number"
              id="precioUnitario"
              name="precioUnitario"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
              value={formData.precioUnitario}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="precioPorKilo">
              Precio por Kilo
            </label>
            <input
              type="number"
              id="precioPorKilo"
              name="precioPorKilo"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
              value={formData.precioPorKilo}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="descripcion">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Descripción del Insumo"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="lugarDeVenta">
              Lugar de Venta
            </label>
            <input
              type="text"
              id="lugarDeVenta"
              name="lugarDeVenta"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
              value={formData.lugarDeVenta}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="correoContacto">
              Correo de Contacto
            </label>
            <input
              type="email"
              id="correoContacto"
              name="correoContacto"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
              value={formData.correoContacto}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="telefonoContacto">
              Teléfono de Contacto
            </label>
            <input
              type="text"
              id="telefonoContacto"
              name="telefonoContacto"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
              value={formData.telefonoContacto}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="tipoDeVenta">
              Tipo de Venta
            </label>
            <input
              type="text"
              id="tipoDeVenta"
              name="tipoDeVenta"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
              value={formData.tipoDeVenta}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="codigoEmpresa">
              Código de Empresa
            </label>
            <Select
              options={empresasOptions}
              onChange={handleSelectChange}
              value={empresasOptions.find(option => option.value === formData.codigoEmpresa)}
              placeholder="Seleccionar Empresa"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-darkyellow hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Crear Insumo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
