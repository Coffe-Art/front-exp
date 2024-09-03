import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaStar } from 'react-icons/fa';
import { Header } from '../ForView/Header';
import { Footer } from '../ForView/Footer';
import ProductoContext from '../../../Context/contextProducto';

export const CraftComprador = () => {
  const { productos, setProductos } = useContext(ProductoContext);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [filtroAbierto, setFiltroAbierto] = useState(false);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [categoria, setCategoria] = useState('todos');
  const [precioMinimo, setPrecioMinimo] = useState(0);
  const [precioMaximo, setPrecioMaximo] = useState(0);
  const [calificacion, setCalificacion] = useState(0);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [opcionesCategorias, setOpcionesCategorias] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProductos = async () => {
      setCargando(true);
      try {
        const response = await fetch('https://checkpoint-9tp4.onrender.com/api/comprador/ver/productos', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) throw new Error('Error al obtener productos');
        const resultado = await response.json();

        const datosProductos = resultado.length > 0 ? resultado[0] : [];

        console.log('Productos recibidos:', datosProductos); // Verifica la estructura de los datos

        setProductos(datosProductos);
        setProductosFiltrados(datosProductos); // Mostrar todos los productos por defecto
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    obtenerProductos();
  }, [setProductos]);

  useEffect(() => {
    // Simulando la obtención de categorías
    const obtenerCategorias = () => {
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

      setOpcionesCategorias(categorias);
    };

    obtenerCategorias();
  }, []);

  useEffect(() => {
    filtrarProductos(terminoBusqueda, categoria, [precioMinimo, precioMaximo], calificacion);
  }, [terminoBusqueda, categoria, precioMinimo, precioMaximo, calificacion, productos]);

  const filtrarProductos = (terminoBusqueda, categoria, [precioMinimo, precioMaximo], calificacion) => {
    if (productos.length === 0) return; // Evita filtrar si no hay productos

    console.log('Filtrando con:', { terminoBusqueda, categoria, precioMinimo, precioMaximo, calificacion });

    const productosFiltrados = productos.filter(producto => {
      if (!producto) return false;

      const coincideBusqueda = (producto.nombre && producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())) ||
                               (producto.descripcion && producto.descripcion.toLowerCase().includes(terminoBusqueda.toLowerCase()));
      const coincideCategoria = categoria === 'todos' || (producto.categoria && producto.categoria === categoria);

      // Ajuste en el filtro de precios para que 0 a 0 considere todos los productos
      const precio = parseFloat(producto.precio);
      const coincidePrecio = (precioMinimo === 0 && precioMaximo === 0) ||
                              (precio >= precioMinimo && precio <= precioMaximo);
      const coincideCalificacion = (calificacion === 0 || producto.rating === calificacion);

      console.log('Producto:', producto, 'Coincide con:', { coincideBusqueda, coincideCategoria, coincidePrecio, coincideCalificacion });

      return coincideBusqueda && coincideCategoria && coincidePrecio && coincideCalificacion;
    });

    console.log('Productos filtrados:', productosFiltrados);

    setProductosFiltrados(productosFiltrados);
  };

  const agregarAlCarrito = (producto) => {
    setProductos(productos.map(p => p.idProducto === producto.idProducto ? { ...p, cantidad: p.cantidad - 1 } : p));
  };

  const alternarFiltro = () => {
    setFiltroAbierto(!filtroAbierto);
  };

  const manejarCambioBusqueda = (e) => {
    setTerminoBusqueda(e.target.value);
  };

  const manejarCambioCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const manejarCambioPrecio = () => {
    filtrarProductos(terminoBusqueda, categoria, [precioMinimo, precioMaximo], calificacion);
  };

  const manejarCambioCalificacion = (calificacion) => {
    setCalificacion(calificacion);
  };

  // Función para formatear precios en pesos colombianos
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(precio);
  };

  // Función para resetear precios
  const resetearPrecios = () => {
    setPrecioMinimo(0);
    setPrecioMaximo(0);
    filtrarProductos(terminoBusqueda, categoria, [0, 0], calificacion);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Header />
      <div className="flex flex-col md:flex-row flex-1">
        {/* Filtro en la esquina izquierda */}
        <div className={`md:w-1/4 lg:w-1/5 bg-white border rounded-lg overflow-hidden shadow-md p-4 ${filtroAbierto ? 'block' : 'hidden md:block'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Comprador</h2>
            <button onClick={alternarFiltro} className="text-darkyellow text-xl">
              {/* Add icon here if needed */}
            </button>
          </div>
          <div>
            <div className="flex items-center mb-4">
              <label htmlFor="search" className="block text-sm font-bold mb-2"></label>
              <div className="relative flex-1">
                <input
                  type="text"
                  id="search"
                  value={terminoBusqueda}
                  onChange={manejarCambioBusqueda}
                  className="shadow border rounded w-full py-2 px-3 pr-12"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-2">
                  <FaSearch className="text-darkpurple" />
                </div>
              </div>
            </div>
            <label htmlFor="category" className="block text-sm font-bold mb-2">Categoría</label>
            <select
              id="category"
              value={categoria}
              onChange={manejarCambioCategoria}
              className="shadow border rounded w-full py-2 px-3 mb-4"
            >
              <option value="todos">Todos</option>
              {opcionesCategorias.map(categoria => (
                <option key={categoria.value} value={categoria.value}>{categoria.label}</option>
              ))}
            </select>
            <label htmlFor="price" className="block text-sm font-bold mb-2">Rango de Precio</label>
            <input
              type="number"
              id="precioMinimo"
              value={precioMinimo}
              onChange={e => setPrecioMinimo(Number(e.target.value))}
              placeholder="Precio mínimo"
              className="shadow border rounded w-full py-2 px-3 mb-2"
            />
            <input
              type="number"
              id="precioMaximo"
              value={precioMaximo}
              onChange={e => setPrecioMaximo(Number(e.target.value))}
              placeholder="Precio máximo"
              className="shadow border rounded w-full py-2 px-3 mb-4"
            />
            <button onClick={resetearPrecios} className="bg-gray-500 text-white py-2 px-4 rounded w-full mb-4">Resetear precios</button>
            <label className="block text-sm font-bold mb-2">Calificación</label>
            <div className="flex space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map(rating => (
                <FaStar
                  key={rating}
                  className={`cursor-pointer ${rating <= calificacion ? 'text-yellow-500' : 'text-gray-400'}`}
                  onClick={() => manejarCambioCalificacion(rating)}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Contenido de los productos */}
        <div className="flex-1 p-4">
          {cargando && <p>Cargando...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {productosFiltrados.map(producto => (
              <div key={producto.idProducto} className="bg-white p-4 rounded-lg shadow-md">
                <img
  src={`https://imagenes224.blob.core.windows.net/imagenes224/${producto.urlProductoImg.split('/').pop()}`}
  alt={producto.nombre}
  className="product-image"
/>
                <h3 className="text-lg font-semibold mb-2">{producto.nombre}</h3>
                <p className="text-gray-700 mb-2">{producto.descripcion}</p>
                <p className="text-darkyellow font-bold mb-2">{formatearPrecio(producto.precio)}</p>
                <button
                  onClick={() => agregarAlCarrito(producto)}
                  className="bg-darkyellow text-white py-2 px-4 rounded"
                >
                  Agregar al Carrito
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
