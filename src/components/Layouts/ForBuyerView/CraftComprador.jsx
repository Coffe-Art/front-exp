import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaStar } from 'react-icons/fa';
import { Header } from '../ForView/Header';
import { Footer } from '../ForView/Footer';
import ProductoContext from '../../../Context/contextProducto';

export const CraftComprador = () => {
  const { productos, setProductos } = useContext(ProductoContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://checkpoint-9tp4.onrender.com/api/comprador/ver/productos', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
    
        if (!response.ok) throw new Error('Error al obtener productos');
        const result = await response.json();
    
        // Si el array tiene un solo objeto, verifica la propiedad de productos
        const productosData = result.length > 0 ? result[0] : [];
    
        console.log('Productos recibidos:', productosData); // Verifica la estructura de los datos
    
        setProductos(productosData);
        setFilteredProducts(productosData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, [setProductos]);

  
    const filterProducts = (searchTerm, category, [minPrice, maxPrice], rating) => {
      if (productos.length === 0) return; // Evita filtrar si no hay productos
    
      setFilteredProducts(productos.filter(product => {
        if (!product) return false;
    
        const matchesSearch = (product.nombre && product.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
                               (product.descripcion && product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = category === 'all' || (product.categoria && product.categoria === category);
        const matchesPrice = (parseFloat(product.precio) >= minPrice && parseFloat(product.precio) <= maxPrice);
        const matchesRating = (rating === 0 || product.rating === rating);
    
        return matchesSearch && matchesCategory && matchesPrice && matchesRating;
      }));
    };

  const addToCart = (product) => {
    // Suponiendo que el estado del carrito está en otro contexto o hook
    // setCart([...cart, product]);
    // Actualiza el stock del producto
    setProductos(productos.map(p => p.idProducto === product.idProducto ? { ...p, cantidad: p.cantidad - 1 } : p));
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = () => {
    filterProducts(searchTerm, category, [minPrice, maxPrice], rating);
  };

  const handleRatingChange = (rating) => {
    setRating(rating);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Header />
      <div className="flex flex-col md:flex-row flex-1">
        {/* Filtro en la esquina izquierda */}
        <div className={`md:w-1/4 lg:w-1/5 bg-white border rounded-lg overflow-hidden shadow-md p-4 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Comprador</h2>
            <button onClick={toggleFilter} className="text-darkyellow text-xl">
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
              <option value="decoracion">Decoración</option>
              <option value="aretes">Aretes</option>
              <option value="ruanas">Ruanas</option>
              <option value="pulseras">Pulseras</option>
              <option value="bolsos">Bolsos</option>
            </select>
            <label htmlFor="price" className="block text-sm font-bold mb-2">Rango de Precio</label>
            <div className="flex mb-4 items-center">
              <input
                type="number"
                min="0"
                max="500"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                onBlur={handlePriceChange}
                className="shadow border rounded w-1/2 py-2 px-3 mr-2"
              />
              <span> - </span>
              <input
                type="number"
                min="0"
                max="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                onBlur={handlePriceChange}
                className="shadow border rounded w-1/2 py-2 px-3 ml-2"
              />
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span>${minPrice}</span>
              <span>${maxPrice}</span>
            </div>
            <label htmlFor="rating" className="block text-sm font-bold mb-2">Puntuación Exacta</label>
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map(star => (
                <FaStar
                  key={star}
                  className={`cursor-pointer ${rating === star ? 'text-darkyellow' : 'text-gray-300'}`}
                  onClick={() => handleRatingChange(star)}
                />
              ))}
              <FaStar
                key="all"
                className={`cursor-pointer ${rating === 0 ? 'text-darkyellow' : 'text-gray-300'}`}
                onClick={() => handleRatingChange(0)}
              />
              <span className="ml-2 text-sm text-gray-600">Todos</span>
            </div>
          </div>
        </div>

        {/* Productos */}
        <div className="flex-1 p-4">
          {loading && <p className="text-center text-gray-600">Cargando productos...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}
          {!loading && !error && (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredProducts.map(product => (
                <div key={product.idProducto} className="bg-white border rounded-lg overflow-hidden shadow-md flex flex-col items-center p-4">
                  <img
  src={`https://imagenes224.blob.core.windows.net/imagenes224/${product.urlProductoImg.split('/').pop()}`}
  alt={product.nombre}
  className="product-image"
/>

                  <h3 className="text-lg font-semibold mb-2 text-center">{product.nombre}</h3>
                  <p className="text-center"><strong>Publicado por:</strong> {product.publicadoPor}</p>
                  <p className="text-sm text-darkpurple mb-2 text-center">${product.precio}</p>
                  <div className="flex items-center mb-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <FaStar
                        key={star}
                        className={`text-yellow-500 ${star <= product.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-darkpurple text-white py-2 px-4 rounded hover:bg-purple-700"
                  >
                    Añadir al Carrito
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
