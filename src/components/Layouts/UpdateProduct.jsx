import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import Select from 'react-select'; // Importar react-select
import { FaHome } from 'react-icons/fa';
import ProductoContext from '../../Context/contextProducto'; // Asegúrate de que la ruta sea correcta
import { useEmpresa } from '../../Context/contextEmpresa'; // Importar el contexto de empresas
import BackgroundImage from '../../assets/BackgroundLogin.jpg'; 
import Logo from '../../assets/Artesanías.png';

export const UpdateProducto = () => {
  const navigate = useNavigate();
  const { createProducto } = useContext(ProductoContext);
  const { empresas, setEmpresas } = useEmpresa();
  const { codigoempresa } = useParams(); // Obtener el código de la empresa desde la URL

  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    descripcion: '',
    cantidad: '',
    publicadoPor: '',
    codigoempresa: codigoempresa || '', // Usar el valor del parámetro de la URL
    idAdministrador: localStorage.getItem('userId') || '', // Obtener el ID del administrador desde localStorage
    materiales: '',
    empresasSeleccionadas: [], // Asegúrate de que este campo esté en el estado
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState('');
  const [empresasOptions, setEmpresasOptions] = useState([]);
  const [categoriasOptions, setCategoriasOptions] = useState([]);
  const [fileName, setFileName] = useState('');
  const { idProducto } = useParams();
  const allowedTypes = ['image/jpeg', 'image/png'];



  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const idAdministrador = localStorage.getItem('userId'); // Obtén el ID del administrador
        if (idAdministrador) {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('Token de autenticación no encontrado');
          }

          const response = await fetch(`https://backtesteo.onrender.com/api/empresa/consultarPorAdministrador/${idAdministrador}`, {
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
              setEmpresas(empresas);
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
  }, [setEmpresas]);

  useEffect(() => {
    // Simulando la obtención de categorías
    const fetchCategorias = () => {
      // Aquí debes reemplazar esto con la lógica para obtener las categorías reales
      const categorias = [
        {
          value: 'joyeria',
          label: 'Joyería',
          options: [
            { value: 'collares', label: 'Collares' },
            { value: 'pulseras', label: 'Pulseras' },
            { value: 'anillos', label: 'Anillos' },
            { value: 'aretes', label: 'Aretes' },
          ],
        },
        {
          value: 'ropa_y_accesorios',
          label: 'Ropa y Accesorios',
          options: [
            { value: 'camisetas', label: 'Camisetas' },
            { value: 'bufandas', label: 'Bufandas' },
            { value: 'gorras', label: 'Gorros' },
            { value: 'bolsos', label: 'Bolsos' },
          ],
        },
        {
          value: 'ceramica',
          label: 'Cerámica',
          options: [
            { value: 'tazas', label: 'Tazas' },
            { value: 'platos', label: 'Platos' },
            { value: 'jarrones', label: 'Jarrones' },
            { value: 'cuencos', label: 'Cuencos' },
          ],
        },
        {
          value: 'muebles',
          label: 'Muebles',
          options: [
            { value: 'sillas', label: 'Sillas' },
            { value: 'mesas', label: 'Mesas' },
            { value: 'estanterias', label: 'Estanterías' },
            { value: 'lamparas', label: 'Lámparas' },
          ],
        },
        {
          value: 'decoracion',
          label: 'Decoración',
          options: [
            { value: 'cuadros', label: 'Cuadros' },
            { value: 'alfombras', label: 'Alfombras' },
            { value: 'cortinas', label: 'Cortinas' },
            { value: 'figuras_decorativas', label: 'Figuras decorativas' },
          ],
        },
        {
          value: 'arte_textil',
          label: 'Arte Textil',
          options: [
            { value: 'bordados', label: 'Bordados' },
            { value: 'tejidos', label: 'Tejidos' },
            { value: 'tapices', label: 'Tapices' },
            { value: 'quilts', label: 'Quilts' },
          ],
        },
        {
          value: 'productos_de_madera',
          label: 'Productos de Madera',
          options: [
            { value: 'utensilios_cocina', label: 'Utensilios de cocina' },
            { value: 'marcos_fotos', label: 'Marcos para fotos' },
            { value: 'juguetes', label: 'Juguetes' },
            { value: 'cajas', label: 'Cajas' },
          ],
        },
        {
          value: 'cosmeticos_y_cuidado_personal',
          label: 'Cosméticos y Cuidado Personal',
          options: [
            { value: 'jabones', label: 'Jabones' },
            { value: 'cremas', label: 'Cremas' },
            { value: 'aceites_esenciales', label: 'Aceites esenciales' },
            { value: 'bano_salas', label: 'Baños de sales' },
          ],
        },
        {
          value: 'papeleria_y_libros',
          label: 'Papelería y Libros',
          options: [
            { value: 'cuadernos', label: 'Cuadernos' },
            { value: 'tarjetas', label: 'Tarjetas' },
            { value: 'agendas', label: 'Agendas' },
            { value: 'libros_artesanales', label: 'Libros artesanales' },
          ],
        },
        {
          value: 'articulos_para_el_hogar',
          label: 'Artículos para el Hogar',
          options: [
            { value: 'cojines', label: 'Cojines' },
            { value: 'manteles', label: 'Manteles' },
            { value: 'toallas', label: 'Toallas' },
            { value: 'organizadores', label: 'Organizadores' },
          ],
        },
        {
          value: 'juguetes_y_juegos',
          label: 'Juguetes y Juegos',
          options: [
            { value: 'juguetes_madera', label: 'Juguetes de madera' },
            { value: 'juegos_mesa', label: 'Juegos de mesa artesanales' },
            { value: 'peluches', label: 'Peluches' },
            { value: 'rompecabezas', label: 'Rompecabezas' },
          ],
        },
        {
          value: 'instrumentos_musicales',
          label: 'Instrumentos Musicales',
          options: [
            { value: 'guitarras', label: 'Guitarras' },
            { value: 'tamboriles', label: 'Tamboriles' },
            { value: 'flautas', label: 'Flautas' },
            { value: 'maracas', label: 'Maracas' },
          ],
        },
        {
          value: 'productos_ecologicos',
          label: 'Productos Ecológicos',
          options: [
            { value: 'bolsas_reutilizables', label: 'Bolsas reutilizables' },
            { value: 'productos_sin_plastico', label: 'Productos sin plástico' },
            { value: 'articulos_reciclados', label: 'Artículos reciclados' },
          ],
        },
        {
          value: 'productos_para_mascotas',
          label: 'Productos para Mascotas',
          options: [
            { value: 'juguetes_mascotas', label: 'Juguetes para mascotas' },
            { value: 'camas', label: 'Camas' },
            { value: 'collares', label: 'Collares' },
            { value: 'comederos', label: 'Comederos' },
          ],
        },
      ];
      
      setCategoriasOptions(categorias);
    };

    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setFileName(selectedFile.name); // Actualiza el nombre del archivo
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        file: 'Tipo de archivo no permitido'
      }));
    }
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    if (actionMeta.name === 'categoria') {
      setFormData(prevData => ({
        ...prevData,
        categoria: selectedOption ? selectedOption.value : ''
      }));
    } else if (actionMeta.name === 'codigoempresa') {
      const selectedEmpresa = selectedOption || null;
      const codigoempresa = selectedEmpresa ? selectedEmpresa.value : '';
      const publicadoPor = selectedEmpresa ? selectedEmpresa.label : '';
      
      setFormData(prevData => ({
        ...prevData,
        codigoempresa: codigoempresa,
        publicadoPor: publicadoPor
      }));
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
  
    // Validaciones
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    if (!formData.categoria.trim()) {
      newErrors.categoria = 'La categoría es obligatoria';
    }
    if (formData.precio <= 0) {
      newErrors.precio = 'El precio debe ser un número positivo';
    }
    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es obligatoria';
    }
    if (formData.cantidad <= 0) {
      newErrors.cantidad = 'La cantidad debe ser un número positivo';
    }
    if (!formData.codigoempresa) { // Cambiado aquí
      newErrors.codigoempresa = 'Debes seleccionar al menos una empresa';
    }
    if (errors.file) {
      newErrors.file = errors.file;
    }
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      try {
        await createProducto(formData, file);
        setNotification('Producto creado exitosamente');
        setTimeout(() => {
          setNotification('');
          navigate('/CraftforAdmins');
        }, 2000);
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
            <label className="block text-black text-sm font-bold mb-2" htmlFor="nombre">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nombre del Producto"
              value={formData.nombre}
              onChange={handleChange}
            />
            {errors.nombre && <p className="text-red-500 text-xs italic">{errors.nombre}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="categoria">
              Categoría
            </label>
            <Select
  name="categoria"
  options={categoriasOptions}
  onChange={handleSelectChange}
  placeholder="Selecciona una categoría"
  className="basic-single"
  classNamePrefix="select"
/>
            {errors.categoria && <p className="text-red-500 text-xs italic">{errors.categoria}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="precio">
              Precio
            </label>
            <input
              type="number"
              id="precio"
              name="precio"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Precio del Producto"
              value={formData.precio}
              onChange={handleChange}
            />
            {errors.precio && <p className="text-red-500 text-xs italic">{errors.precio}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="descripcion">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Descripción del Producto"
              value={formData.descripcion}
              onChange={handleChange}
            />
            {errors.descripcion && <p className="text-red-500 text-xs italic">{errors.descripcion}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="cantidad">
              Cantidad
            </label>
            <input
              type="number"
              id="cantidad"
              name="cantidad"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Cantidad en Inventario"
              value={formData.cantidad}
              onChange={handleChange}
            />
            {errors.cantidad && <p className="text-red-500 text-xs italic">{errors.cantidad}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="codigoempresa">
              Empresa
            </label>
            <Select
  name="codigoempresa"
  options={empresasOptions}
  onChange={handleSelectChange}
  placeholder="Selecciona una empresa"
  className="basic-single"
  classNamePrefix="select"
/>
            {errors.codigoempresa && <p className="text-red-500 text-xs italic">{errors.codigoempresa}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="materiales">
              Materiales
            </label>
            <input
              type="text"
              id="materiales"
              name="materiales"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-darkyellow leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Materiales del Producto"
              value={formData.materiales}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="file">
              Imagen del Producto
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
            />
            {fileName && <p className="text-gray-600 text-sm">Archivo seleccionado: {fileName}</p>}
            {errors.file && <p className="text-red-500 text-xs italic">{errors.file}</p>}
          </div>
          <button
            type="submit"
            className="bg-darkyellow hover:bg-darkyellow-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Crear Producto
          </button>
        </form>
      </div>
    </div>
  );
};
