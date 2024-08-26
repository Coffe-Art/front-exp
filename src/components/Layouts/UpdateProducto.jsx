import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import Select from 'react-select';
import { FaHome } from 'react-icons/fa';
import ProductoContext from '../../Context/contextProducto';
import { useEmpresa } from '../../Context/contextEmpresa';
import BackgroundImage from '../../assets/BackgroundLogin.jpg'; 
import Logo from '../../assets/Artesanías.png';

export const UpdateProducto = () => {
  const { idProducto } = useParams();
  const navigate = useNavigate();
  const { getProductoById, updateProducto } = useContext(ProductoContext);
  const { empresas, setEmpresas } = useEmpresa();

  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    descripcion: '',
    cantidad: '',
    publicadoPor: '',
    codigoempresa: '',
    idAdministrador: localStorage.getItem('userId') || '',
    materiales: '',
    empresasSeleccionadas: [],
    imagenActual: '', // Campo para almacenar la URL de la imagen actual
  });

  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState('');
  const [empresasOptions, setEmpresasOptions] = useState([]);
  const [categoriasOptions, setCategoriasOptions] = useState([]);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const idAdministrador = localStorage.getItem('userId');
        if (idAdministrador) {
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

          const data = await response.json();
          if (Array.isArray(data) && Array.isArray(data[0])) {
            const empresas = data[0];
            setEmpresas(empresas);
            const options = empresas.map(empresa => ({
              value: empresa.codigoempresa,
              label: empresa.nombre
            }));
            setEmpresasOptions(options);
          } else {
            throw new Error('Formato de datos inesperado');
          }
        }
      } catch (error) {
        console.error('Error al obtener empresas:', error.message);
      }
    };

    fetchEmpresas();
  }, [setEmpresas]);


  
  useEffect(() => {
    const fetchCategorias = () => {
      const categorias = [
        { value: 'joyeria', label: 'Joyería' },
        { value: 'ropa_y_accesorios', label: 'Ropa y Accesorios' },
        { value: 'ceramica', label: 'Cerámica' },
        { value: 'muebles', label: 'Muebles' },
        { value: 'decoracion', label: 'Decoración' },
        { value: 'arte_textil', label: 'Arte Textil' },
        { value: 'productos_de_madera', label: 'Productos de Madera' },
        { value: 'cosmeticos_y_cuidado_personal', label: 'Cosméticos y Cuidado Personal' },
        { value: 'papeleria_y_libros', label: 'Papelería y Libros' },
        { value: 'articulos_para_el_hogar', label: 'Artículos para el Hogar' },
        { value: 'juguetes_y_juegos', label: 'Juguetes y Juegos' },
        { value: 'instrumentos_musicales', label: 'Instrumentos Musicales' },
        { value: 'productos_ecologicos', label: 'Productos Ecológicos' },
        { value: 'productos_para_mascotas', label: 'Productos para Mascotas' },
        { value: 'otro', label: 'Otro' },
      ];

      setCategoriasOptions(categorias);
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token de autenticación no encontrado');
        }

        const response = await fetch(`https://checkpoint-9tp4.onrender.com/api/producto/obtenerProducto/${idProducto}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setFormData({
          nombre: data.nombre || '',
          categoria: data.categoria || '',
          precio: data.precio || '',
          descripcion: data.descripcion || '',
          cantidad: data.cantidad || '',
          publicadoPor: data.publicadoPor || '',
          codigoempresa: data.codigoempresa || '',
          idAdministrador: data.idAdministrador || '',
          materiales: data.materiales || '',
          empresasSeleccionadas: data.empresasSeleccionadas || [],
          imagenActual: data.imagen || '', // Almacena la URL de la imagen actual
        });
      } catch (error) {
        console.error('Error al obtener producto:', error.message);
      }
    };

    fetchProducto();
  }, [idProducto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOptions, actionMeta) => {
    if (actionMeta.name === 'categoria') {
      const selectedCategory = selectedOptions ? selectedOptions.value : '';
      setFormData(prevData => ({
        ...prevData,
        categoria: selectedCategory
      }));
    } else if (actionMeta.name === 'codigoempresa') {
      const empresasSeleccionadas = selectedOptions ? selectedOptions.map(option => option.value) : [];
      const selectedEmpresa = selectedOptions.length > 0 ? selectedOptions[0] : null;
      const codigoempresa = empresasSeleccionadas.length > 0 ? empresasSeleccionadas[0] : '';
      const publicadoPor = selectedEmpresa ? selectedEmpresa.label : '';
    
      setFormData(prevData => ({
        ...prevData,
        empresasSeleccionadas: empresasSeleccionadas,
        codigoempresa: codigoempresa,
        publicadoPor: publicadoPor
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
  
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.categoria.trim()) newErrors.categoria = 'La categoría es obligatoria';
    if (formData.precio <= 0) newErrors.precio = 'El precio debe ser un número positivo';
    if (!formData.descripcion.trim()) newErrors.descripcion = 'La descripción es obligatoria';
    if (formData.cantidad <= 0) newErrors.cantidad = 'La cantidad debe ser un número positivo';
    if (formData.empresasSeleccionadas.length === 0) newErrors.codigoempresa = 'Debes seleccionar al menos una empresa';
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(`https://checkpoint-9tp4.onrender.com/api/producto/actualizarProducto/${idProducto}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            imagen: formData.imagenActual // Enviar la URL de la imagen actual
          }),
        });
  
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
  
        setNotification('Producto actualizado exitosamente');
        setTimeout(() => {
          setNotification('');
          navigate('/CraftforAdmins');
        }, 2000);
      } catch (error) {
        console.error('Error al actualizar producto:', error);
        setNotification('Error al actualizar el producto, intenta de nuevo');
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
      <NavLink to="/CraftforAdmins" className="absolute top-4 left-4">
        <FaHome className="text-darkyellow text-4xl" />
      </NavLink>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full space-y-6">
        <div className="flex justify-center">
          <img src={Logo} alt="Logo" className="w-32 mb-4" />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">Actualizar Producto</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre del Producto</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 mt-1`}
            />
            {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Categoría</label>
            <Select
              name="categoria"
              options={categoriasOptions}
              value={categoriasOptions.find(option => option.value === formData.categoria)}
              onChange={handleSelectChange}
              className="mt-1"
            />
            {errors.categoria && <p className="text-red-500 text-xs">{errors.categoria}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Precio</label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              className={`w-full border ${errors.precio ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 mt-1`}
            />
            {errors.precio && <p className="text-red-500 text-xs">{errors.precio}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className={`w-full border ${errors.descripcion ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 mt-1`}
            />
            {errors.descripcion && <p className="text-red-500 text-xs">{errors.descripcion}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Cantidad</label>
            <input
              type="number"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              className={`w-full border ${errors.cantidad ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 mt-1`}
            />
            {errors.cantidad && <p className="text-red-500 text-xs">{errors.cantidad}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Empresa Publicadora</label>
            <Select
              name="codigoempresa"
              options={empresasOptions}
              value={empresasOptions.filter(option => formData.empresasSeleccionadas.includes(option.value))}
              onChange={handleSelectChange}
              isMulti
              className="mt-1"
            />
            {errors.codigoempresa && <p className="text-red-500 text-xs">{errors.codigoempresa}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Materiales</label>
            <input
              type="text"
              name="materiales"
              value={formData.materiales}
              onChange={handleChange}
              className={`w-full border ${errors.materiales ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 mt-1`}
            />
          </div>
          <button
            type="submit"
            className="bg-darkyellow text-white font-bold py-2 px-4 rounded-full hover:bg-yellow-600 w-full"
          >
            Actualizar Producto
          </button>
        </form>
        {notification && <p className="text-green-500 text-center mt-4">{notification}</p>}
      </div>
    </div>
  );
};
