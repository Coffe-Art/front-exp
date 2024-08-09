import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { Header } from './Header';
import { Footer } from './Footer';
import ProductoContext from '../../Context/contextProducto';

export const CraftforAdmins = () => {
  const { productos, setProductos } = useContext(ProductoContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(true); // Estado para el checkbox

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  console.log('userId:', userId); // Añade esto para verificar el valor de userId


  useEffect(() => {
    const getProductosByIdAdministrador = async () => {
      if (!userId) {
        setError('Usuario no autenticado');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://backtesteo.onrender.com/api/producto/obtenerPorAdministrador/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) throw new Error('Error al obtener productos');
        const result = await response.json();

        // Extrae el array de productos del primer elemento de la respuesta
        const productosArray = Array.isArray(result[0]) ? result[0] : [];
        console.log('Array de productos:', productosArray);

        setProductos(productosArray);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getProductosByIdAdministrador();
  }, [userId, setProductos]);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, category, minPrice, maxPrice, selectedCompany, productos, isCheckboxChecked]);

  const filterProducts = () => {
    const filtered = productos.filter(product => {
      if (!product || typeof product !== 'object') return false;

      const {
        nombre = '',
        descripcion = '',
        categoria = '',
        precio = 0,
        publicadoPor = ''
      } = product;

      return (
        (nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
         descripcion.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (category === 'all' || categoria === category) &&
        (isCheckboxChecked || (precio >= minPrice && precio <= maxPrice)) &&
        (selectedCompany === 'all' || publicadoPor === selectedCompany)
      );
    });

    console.log('Productos filtrados:', filtered);

    setFilteredProducts(filtered);
  };

  const toggleFilter = () => setIsFilterOpen(prev => !prev);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handlePriceChange = () => filterProducts();

  const handleCompanyChange = (e) => setSelectedCompany(e.target.value);

  const handleEdit = (idProducto) => navigate(`/updateProduct/${idProducto}`);

  const handleDelete = async (idProducto) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        const response = await fetch(`https://backtesteo.onrender.com/api/producto/eliminar/${idProducto}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) throw new Error('Error al eliminar el producto');
        setProductos(prevProductos => prevProductos.filter(product => product.idProducto !== idProducto));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Extrae las empresas únicas del array de productos
  const companies = Array.from(new Set(productos.map(product => product.publicadoPor)));
  console.log('Empresas únicas:', companies);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Header />
      <div className="flex flex-col md:flex-row flex-1">
        <div className={`md:w-1/4 lg:w-1/5 bg-white border rounded-lg overflow-hidden shadow-md p-4 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Filtros</h2>
            <button onClick={toggleFilter} className="text-darkyellow text-xl">
              <FaSearch /> {/* Agrega icono si es necesario */}
            </button>
          </div>
          <div>
            <div className="flex items-center mb-4">
              <label htmlFor="search" className="block text-sm font-bold mb-2"></label>
              <div className="relative flex-1">
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
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
              value={category}
              onChange={handleCategoryChange}
              className="shadow border rounded w-full py-2 px-3 mb-4"
            >
              <option value="all">Todos</option>
              <option value="earrings">Aretes</option>
              <option value="ruanas">Ruanas</option>
              <option value="necklaces">Collares</option>
              <option value="bracelets">Pulseras</option>
            </select>
            <label htmlFor="price" className="block text-sm font-bold mb-2">Rango de Precio</label>
            <div className="flex items-center mb-4">
              <input
                type="number"
                min="0"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="shadow border rounded w-full py-2 px-3 mr-2"
              />
              <span className="text-gray-500">a</span>
              <input
                type="number"
                min="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="shadow border rounded w-full py-2 px-3 ml-2"
              />
            </div>
            <label htmlFor="company" className="block text-sm font-bold mb-2">Empresa</label>
            <select
              id="company"
              value={selectedCompany}
              onChange={handleCompanyChange}
              className="shadow border rounded w-full py-2 px-3 mb-4"
            >
              <option value="all">Todas</option>
              {companies.map((company) => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
            <button
              onClick={handlePriceChange}
              className="bg-darkpurple text-white px-4 py-2 rounded shadow-md"
            >
              Filtrar
            </button>
            <div className="mt-4">
              <input
                type="checkbox"
                id="checkbox"
                checked={isCheckboxChecked}
                onChange={() => setIsCheckboxChecked(!isCheckboxChecked)} // Permite activar/desactivar
                className="mr-2"
              />
              <label htmlFor="checkbox" className="text-sm font-bold">Mostrar todos los productos</label>
            </div>
          </div>
        </div>
        <div className="flex-1 p-4">
          <button
            onClick={() => navigate('/createProduct')}
            className="bg-darkyellow text-white px-4 py-2 rounded shadow-md mb-4 flex items-center"
          >
            <FaPlus className="mr-2" /> Agregar Producto
          </button>
          {loading ? (
            <p>Cargando productos...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div key={product.idProducto} className="bg-white border rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-bold">{product.nombre}</h3>
                    <p className="text-gray-700">Descripción: {product.descripcion}</p>
                    <p className="text-gray-700">Categoría: {product.categoria}</p>
                    <p className="text-gray-700">Precio: ${product.precio}</p>
                    <p className="text-gray-700">Publicado en: {product.publicadoPor}</p>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => handleEdit(product.idProducto)}
                        className="bg-darkpurple text-white px-2 py-1 rounded flex items-center"
                      >
                        <FaEdit className="mr-1" /> Editar
                      </button>
                      <button
                        onClick={() => handleDelete(product.idProducto)}
                        className="bg-red-500 text-white px-2 py-1 rounded flex items-center"
                      >
                        <FaTrash className="mr-1" /> Eliminar
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No se encontraron productos</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
