// src/components/Statistics.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registramos los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Statistics = () => {
  // Datos para el gráfico
  const data = {
    labels: ['Productos Vendidos', 'Clientes Satisfechos', 'Productos en Inventario', 'Proveedores Asociados'],
    datasets: [
      {
        label: 'Estadísticas',
        data: [500, 1000, 200, 50], // Datos ficticios
        backgroundColor: 'rgba(255, 215, 0, 0.6)', // Color de fondo para las barras
        borderColor: 'rgba(255, 215, 0, 1)', // Color del borde de las barras
        borderWidth: 1,
      },
    ],
  };

  // Opciones para el gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Categorías',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Cantidad',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-gray-200 py-8">
      <div className="text-center mb-8">
        <h1 className="text-black text-2xl md:text-4xl font-bold">ESTADÍSTICAS</h1>
        <p className="text-black text-sm md:text-lg mx-auto max-w-2xl">
          Aquí presentamos algunas estadísticas interesantes sobre nuestros productos y servicios. 
          Cada dato refleja nuestro compromiso con la calidad y la satisfacción del cliente.
        </p>
      </div>
      <div className="flex flex-col items-center mb-8">
        <div className="w-full md:w-2/3 lg:w-1/2">
          <Bar data={data} options={options} />
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="bg-darkyellow rounded-lg p-4 shadow-md text-center flex flex-col justify-center items-center mx-2 mb-4 w-48 sm:w-64 lg:w-80">
          <h3 className="text-lg font-bold">500+</h3>
          <p className="text-sm mt-1">Productos Vendidos</p>
        </div>
        <div className="bg-darkyellow rounded-lg p-4 shadow-md text-center flex flex-col justify-center items-center mx-2 mb-4 w-48 sm:w-64 lg:w-80">
          <h3 className="text-lg font-bold">1000+</h3>
          <p className="text-sm mt-1">Clientes Satisfechos</p>
        </div>
        <div className="bg-darkyellow rounded-lg p-4 shadow-md text-center flex flex-col justify-center items-center mx-2 mb-4 w-48 sm:w-64 lg:w-80">
          <h3 className="text-lg font-bold">200+</h3>
          <p className="text-sm mt-1">Productos en Inventario</p>
        </div>
        <div className="bg-darkyellow rounded-lg p-4 shadow-md text-center flex flex-col justify-center items-center mx-2 mb-4 w-48 sm:w-64 lg:w-80">
          <h3 className="text-lg font-bold">50+</h3>
          <p className="text-sm mt-1">Proveedores Asociados</p>
        </div>
      </div>
    </div>
  );
};
