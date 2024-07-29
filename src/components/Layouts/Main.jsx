import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaBars, FaStar } from 'react-icons/fa';
import HeaderImage from '../../assets/Cabecera.png';
import { InformationMain } from './InformationMain';
import imageEarring from '../../assets/AretesArtesanales.jpg';
import imageRuana from '../../assets/RuanaArtesanal.jpg';
import imageBracelet from '../../assets/PulserasArtesanales.jpg';
import imageBag from '../../assets/BolsoArtesanal.jpg';

export const Main = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [price, setPrice] = useState(500);
  const [rating, setRating] = useState(1);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <section className="flex flex-col md:flex-row p-4 md:p-8 bg-gray-200">
        <div className="flex justify-between items-center w-full mb-4 md:hidden">
          <button onClick={toggleFilter} className="p-1 rounded">
            <FaBars className="text-darkyellow text-2xl" />
          </button>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center md:items-end mb-4 md:mb-0">
          <img src={HeaderImage} alt="HeaderMain" className="block mx-auto max-w-full h-auto" />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center md:text-right">COFFE ART</h1>
          <p className="text-sm md:text-lg text-center md:text-right px-2 md:px-8 py-2 max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce suscipit, nisi ac tristique
            placerat, dui justo rutrum turpis, id lacinia felis nisi ac tellus. Sed ultricies euismod dui,
            eget ultricies felis. Duis in augue non augue viverra tincidunt non a est. Curabitur quis augue
            ac odio semper accumsan vel at enim.
          </p>
        </div>
      </section>

      {isFilterOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Filtrar Productos</h2>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Categoría</label>
              <select className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
                <option value="all">Todas</option>
                <option value="earrings">Aretes</option>
                <option value="ruanas">Ruanas</option>
                <option value="bracelets">Pulseras</option>
                <option value="bags">Bolsos</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Precio: {formatPrice(price)}</label>
              <input
                type="range"
                min="500"
                max="500000"
                value={price}
                onChange={handlePriceChange}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Valoración: {rating} estrella(s)</label>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={rating}
                onChange={handleRatingChange}
                className="w-full"
              />
              <div className="flex mt-2">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={index < rating ? 'text-darkyellow' : 'text-gray-300'}
                  />
                ))}
              </div>
            </div>
            <button className="bg-darkyellow hover:bg-lightyellow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Aplicar Filtros
            </button>
            <button onClick={toggleFilter} className="bg-darkpurple hover:bg-lightpurple text-white font-bold py-2 px-4 rounded ml-4 focus:outline-none focus:shadow-outline">
              Cerrar
            </button>
          </div>
        </div>
      )}

      <div className="flex bg-darkpurple justify-center items-center h-64 px-4">
        <div className="w-full md:w-3/4 relative text-center justify-center">
          <Slider {...settings}>
            {InformationMain.map((item) => (
              <div key={item.id} className="m-4 p-4 bg-purple text-center relative">
                <h2 className="text-darkyellow text-2xl md:text-4xl font-bold">{item.title}</h2>
                <p className="text-white text-sm m-4">{item.description}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="bg-gray-200 py-8">
        <div className="text-center mb-8">
          <h1 className="text-black text-2xl md:text-4xl font-bold">NOVEDADES</h1>
          <p className="text-black text-sm m-4 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce suscipit, nisi ac tristique
            placerat, dui justo rutrum turpis, id lacinia felis nisi ac tellus. Sed ultricies euismod dui,
            eget ultricies felis. Duis in augue non augue viverra tincidunt non a est. Curabitur quis augue
            ac odio semper accumsan vel at enim.
          </p>
        </div>
        <h1 className="text-darkyellow text-2xl md:text-4xl font-bold text-center mb-8">PRODUCTOS MÁS VENDIDOS</h1>
        <div className="flex flex-wrap justify-center">
          <div className="product-container bg-darkyellow rounded-lg p-4 shadow-md text-center flex flex-col justify-center items-center mx-2 mb-4 w-48 md:w-64 lg:w-80">
            <img src={imageEarring} alt="imageEarring" className="w-24 h-auto md:w-32 lg:w-40" />
            <h3 className="text-lg font-bold">Aretes Artesanales</h3>
            <p className="text-sm">Descripción de los aretes artesanales...</p>
          </div>
          <div className="product-container bg-darkyellow rounded-lg p-4 shadow-md text-center flex flex-col justify-center items-center mx-2 mb-4 w-48 md:w-64 lg:w-80">
            <img src={imageRuana} alt="imageRuana" className="w-24 h-auto md:w-32 lg:w-40" />
            <h3 className="text-lg font-bold">Ruana Artesanal</h3>
            <p className="text-sm">Descripción de la ruana artesanal...</p>
          </div>
          <div className="product-container bg-darkyellow rounded-lg p-4 shadow-md text-center flex flex-col justify-center items-center mx-2 mb-4 w-48 md:w-64 lg:w-80">
            <img src={imageBracelet} alt="imageBracelet" className="w-24 h-auto md:w-32 lg:w-40" />
            <h3 className="text-lg font-bold">Pulseras Artesanales</h3>
            <p className="text-sm">Descripción de las pulseras artesanales...</p>
          </div>
          <div className="product-container bg-darkyellow rounded-lg p-4 shadow-md text-center flex flex-col justify-center items-center mx-2 mb-4 w-48 md:w-64 lg:w-80">
            <img src={imageBag} alt="imageBag" className="w-24 h-auto md:w-32 lg:w-40" />
            <h3 className="text-lg font-bold">Bolso Artesanal</h3>
            <p className="text-sm">Descripción del bolso artesanal...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

