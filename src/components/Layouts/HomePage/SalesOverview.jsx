// src/pages/SalesOverview.jsx

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Logo from '../../../assets/Artesanías.png';
import BackgroundImage from '../../../assets/FondoMenu.png';
import Background from '../../../assets/Fondo.png';
import { NavLink } from 'react-router-dom';

export const SalesOverview = ({ isAuthenticated, userType }) => {
  const [totalSales, setTotalSales] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [showAccessMessage, setShowAccessMessage] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [noSalesMessage, setNoSalesMessage] = useState(false);

  const userRole = localStorage.getItem('userType');
  const token = localStorage.getItem('authToken'); // Asegúrate de que el token esté presente

  const salesData = {
    labels: ['Ventas Totales', 'Ingresos Totales', 'Pedidos Totales'],
    datasets: [
      {
        label: 'Estadísticas de Ventas',
        data: [totalSales, totalRevenue, totalOrders],
        backgroundColor: ['#B89158', '#3B2A38', '#271D25'],
        borderWidth: 0,
      },
    ],
  };

  useEffect(() => {
    const fetchSalesOverview = async () => {
      if (userRole === 'administrador') {
        try {
          setIsLoading(true);
          const response = await fetch('https://checkpoint-9tp4.onrender.com/admin/sales-overview', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Asegúrate de que el token esté incluido
            },
          });

          if (response.status === 401) {
            setShowAccessMessage(true);
            setIsLoading(false);
            return;
          }

          if (!response.ok) {
            throw new Error('Error en la respuesta de la red');
          }

          const data = await response.json();
          const { totalVentas, totalIngresos, totalPedidos } = data;
          setTotalSales(totalVentas);
          setTotalRevenue(totalIngresos);
          setTotalOrders(totalPedidos);
          setIsLoading(false);
        } catch (error) {
          console.error('Error al obtener las estadísticas de ventas:', error);
          setErrorMessage('Error al obtener las estadísticas de ventas: ' + error.message);
          setIsLoading(false);
        }
      } else {
        setShowAccessMessage(true);
        setIsLoading(false);
      }
    };

    fetchSalesOverview();
  }, [userRole, token]); // Incluye token en la lista de dependencias

  const handleReportClick = () => {
    if (totalSales > 0) {
      setShowReport(true);
      setNoSalesMessage(false);
    } else {
      setNoSalesMessage(true);
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (errorMessage) {
    return <div className="text-red-500">{errorMessage}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-200">
      <div className="md:w-1/4 lg:w-1/6 bg-cover bg-center p-4 text-white flex flex-col items-center justify-center" style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <a href="/#" className="mb-6">
          <img src={Logo} alt="Logo" className="h-32 w-32" />
        </a>
        <nav className="flex flex-col items-center space-y-6">
          <NavLink to="/menu" className="text-xl md:text-2xl text-white hover:text-darkyellow font-bold">Bienvenido</NavLink>
          <NavLink to={userRole === 'comprador' ? '/ProfileComprador' : '/ProfileForAdmin'} className="text-xl md:text-2xl text-white hover:text-darkyellow font-bold">Perfil</NavLink>
          <NavLink to="/SalesOverview" className="text-xl md:text-2xl text-white hover:text-darkyellow font-bold">Ventas</NavLink>
        </nav>
      </div>

      <div className="flex flex-col justify-center items-center md:w-3/4 lg:w-5/6">
        <div className="w-full h-full flex justify-center items-center bg-cover bg-center p-4" style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="flex flex-col items-center justify-center text-center p-8 bg-white bg-opacity-70 rounded-lg max-w-lg mx-auto md:max-w-2xl w-full">
            <img src={Logo} alt="Logo" className="h-20 w-20 text-gray-800 mb-4 mx-auto" />
            <h1 className="text-black text-3xl md:text-4xl font-bold mb-8">Resumen de Ventas</h1>

            <div className="w-full max-w-lg mb-8">
              <h2 className="text-2xl font-bold text-darkyellow mb-4">Estadísticas Generales</h2>
              <div className="flex flex-col space-y-2 mb-4">
                <p className="text-gray-700">Ventas Totales: <span className="font-bold">{totalSales}</span></p>
                <p className="text-gray-700">Ingresos Totales: <span className="font-bold">${totalRevenue}</span></p>
                <p className="text-gray-700">Pedidos Totales: <span className="font-bold">{totalOrders}</span></p>
              </div>

              {showReport && <Bar data={salesData} />} 
            </div>

            <button className="bg-darkyellow px-6 py-3 text-white font-bold text-lg hover:bg-darkyellow rounded" onClick={handleReportClick}>
              Generar Reporte
            </button>

            {noSalesMessage && (
              <div className="mt-4 text-red-500">
                No se han realizado ventas. No se puede generar el informe.
              </div>
            )}

            
          </div>
        </div>
      </div>
    </div>
  );
};
