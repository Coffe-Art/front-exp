// src/components/Main.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HeaderImage from '../../assets/Cabecera.png';
import { InformationMain } from './InformationMain';
import { Statistics } from './Statistics'; // Importa el nuevo componente de estadísticas


export const Main = () => {
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
        <div className="w-full md:w-1/2 flex justify-center items-center mb-4 md:mb-0">
          <img src={HeaderImage} alt="HeaderMain" className="block mx-auto max-w-full h-auto" />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
          <div className="container mx-auto px-4 flex flex-col items-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center">
              COFFE ART
            </h1>
            <p className="text-sm md:text-lg text-center px-2 md:px-8 py-2 max-w-3xl">
            Buscamos poner en valor y resaltar el incuestionable y valioso trabajo de los artesanos, promoviendo activamente sus productos únicos y auténticos, que son verdaderas expresiones de su arte y habilidades. Además, como una parte integral de nuestra misión, ofrecemos procesos y métodos diseñados para mejorar y ayudar en la gestión de sus negocios. 
            </p>
          </div>
        </div>
      </section>

      <div className="bg-darkpurple py-8">
        <div className="container mx-auto px-4 text-center">
          <Slider {...settings}>
            {InformationMain.map((item) => (
              <div key={item.id} className="p-4 bg-purple text-center relative">
                <h2 className="text-darkyellow text-2xl md:text-4xl font-bold">{item.title}</h2>
                <p className="text-white text-sm md:text-lg m-4">{item.description}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <Statistics /> 
      
    </div>
  );
};
