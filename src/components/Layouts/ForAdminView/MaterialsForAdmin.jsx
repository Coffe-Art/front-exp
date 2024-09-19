import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Header } from '../ForView/Header';
import { Footer } from '../ForView/Footer';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaCoffee } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Función para formatear números a pesos colombianos
const formatToCOP = (value) => {
  if (value == null) return 'N/A';
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
};

export const MaterialsForAdmin = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedInsumo, setSelectedInsumo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false); // Estado para la ventana modal de confirmación
  const [insumoToDelete, setInsumoToDelete] = useState(null); // Estado para el insumo a eliminar
  const navigate = useNavigate(); 

  const fetchInsumos = async () => {
    try {
      const token = localStorage.getItem('token');
      const idAdministrador = localStorage.getItem('userId');
  
      if (!token || !idAdministrador) {
        console.error('Token o ID de administrador no encontrados en el localStorage');
        return;
      }
  
      const response = await fetch(`https://checkpoint-9tp4.onrender.com/api/insumo/insumosPorAdministrador/${idAdministrador}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Insumos obtenidos:', data);
  
      if (Array.isArray(data) && data[0]) {
        console.log('Primer elemento de los insumos:', data[0]);
        setTableData(data[0]);
      } else {
        setTableData(data);
      }
    } catch (error) {
      console.error('Error al obtener insumos:', error.message);
    }
  };

  useEffect(() => {
    fetchInsumos();
  }, []);

  const handleEdit = (id) => {
    console.log('Edit insumo with ID:', id);
    navigate(`/MaterialsUpdateForm/${id}`);
  };
  
  

  const handleDelete = (insumo) => {
    setInsumoToDelete(insumo);
    setIsConfirmDeleteOpen(true); // Abrir la ventana modal de confirmación
  };

  const confirmDelete = async () => {
    if (!insumoToDelete) return;

    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('Token no encontrado en el localStorage');
        return;
      }

      const response = await fetch(`https://checkpoint-9tp4.onrender.com/api/insumo/eliminar/${insumoToDelete.IdInsumo}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      console.log('Insumo eliminado con ID:', insumoToDelete.IdInsumo);
      fetchInsumos();
      closeConfirmDeleteModal(); // Cerrar la ventana modal después de la eliminación
    } catch (error) {
      console.error('Error al eliminar insumo:', error.message);
    }
  };

  const closeConfirmDeleteModal = () => {
    setInsumoToDelete(null);
    setIsConfirmDeleteOpen(false);
  };

  const handleOpenModal = (insumo) => {
    setSelectedInsumo(insumo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedInsumo(null);
    setIsModalOpen(false);
  };

  const labels = tableData.map(item => item.Nombre);
  const dataValues = tableData.map(item => item.cantidadInsumo);

  const barData = {
    labels: labels,
    datasets: [
      {
        label: 'Cantidad del Insumo:',
        data: dataValues,
        backgroundColor: 'rgb(39,31,39)',
        borderColor: 'rgb(39,31,39)',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const handleClick = () => {
    navigate('/MaterialsForm'); 
  };

  const handleGoBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  

  return (
    <div className="min-h-screen bg-gray-200 font-sans">
      <Header />
      <div className="text-center">
      <button 
        onClick={handleGoBack} 
        className="mt-5 ml-5 top-4 left-4 bg-darkyellow text-white px-4 py-2 rounded hover:bg-lightyellow flex items-center"
      >
        <p className="mr-2" /> Volver
      </button> 
        <h2 className="text-darkyellow text-4xl font-bold mt-6 mb-10">Insumos</h2>
        <p className="max-w-2xl mt-2 mx-auto text-lg mb-5">
          ¡Bienvenido, artesano! Este espacio está diseñado para que puedas anotar y llevar gestión de los materiales / insumos que compras para hacer tus artesanías.
          <br /><br />
          Podrás llevar un registro detallado de los materiales que compras para tus artesanías, ayudándote a gestionar de manera fácil tus recursos y tener siempre a mano la información que necesitas para tus creaciones.
        </p>
      </div>
      <div className='pt-5 pr-40 pl-40 pb-5'>
        <div className="div1 p-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Gráfico de Barras</h2>
            <div className="h-64">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>

        <div className="div2 p-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className='separator flex justify-between flex-row mb-3 mt-2'>
              <h2 className="text-3xl font-semibold mb-4">Tabla de Insumos</h2>
              <button 
                onClick={handleClick} 
                className='flex flex-row align-baseline text-3xl text-darkyellow'
              >
                <p className="mr-2 flex justify-center align-baseline" />
                <span className='font-bold text-3xl'> + </span> Agregar Insumo
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-2">IdInsumo</th>
                    <th className="px-3 py-2">Nombre</th>
                    <th className="px-4 py-2">Cantidad</th>
                    <th className="px-4 py-2">Precio Unitario</th>
                    <th className="px-4 py-2">Precio por Kilo</th>
                    <th className="px-4 py-2">Descripción</th>
                    <th className="px-4 py-2">Lugar de Venta</th>
                    <th className="px-4 py-2">Correo Contacto</th>
                    <th className="px-4 py-2">Teléfono Contacto</th>
                    <th className="px-4 py-2">Tipo de Venta</th>
                    <th className="px-4 py-2">Código Empresa</th>
                    <th className="px-4 py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tableData.map((item) => (
                    <tr key={item.IdInsumo} onClick={() => handleOpenModal(item)} className="cursor-pointer hover:bg-gray-100">
                      <td className="px-2 py-2 text-xl">{item.IdInsumo}</td>
                      <td className="px-3 py-2 text-xl">{item.Nombre}</td>
                      <td className="px-4 py-2 text-xl">{item.cantidadInsumo}</td>
                      <td className="px-4 py-2 text-xl">{formatToCOP(item.precioUnitario)}</td>
                      <td className="px-4 py-2 text-xl">{formatToCOP(item.precioPorKilo)}</td>
                      <td className="px-4 py-2 text-xl">{item.descripcion}</td>
                      <td className="px-4 py-2 text-xl">{item.lugarDeVenta}</td>
                      <td className="px-4 py-2 text-xl">{item.correoContacto}</td>
                      <td className="px-4 py-2 text-xl">{item.TelefonoContacto}</td>
                      <td className="px-4 py-2 text-xl">{item.TipoDeVenta}</td>
                      <td className="px-4 py-2 text-xl">{item.codigoEmpresa}</td>
                      <td className="px-4 py-2">
                      <button 
  onClick={(e) => { e.stopPropagation(); handleEdit(item.IdInsumo); }} 
  className="text-darkyellow hover:text-lightyellow text-3xl"
>
  <FaEdit />
</button>

                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDelete(item); }} 
                          className="text-darkpurple hover:text-lightpurple text-3xl"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedInsumo && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-2xl font-semibold mb-4">Detalles del Insumo</h3>
            <p><strong>IdInsumo:</strong> {selectedInsumo.IdInsumo}</p>
            <p><strong>Nombre:</strong> {selectedInsumo.Nombre}</p>
            <p><strong>Cantidad:</strong> {selectedInsumo.cantidadInsumo}</p>
            <p><strong>Precio Unitario:</strong> {formatToCOP(selectedInsumo.precioUnitario)}</p>
            <p><strong>Precio por Kilo:</strong> {formatToCOP(selectedInsumo.precioPorKilo)}</p>
            <p><strong>Descripción:</strong> {selectedInsumo.descripcion}</p>
            <p><strong>Lugar de Venta:</strong> {selectedInsumo.lugarDeVenta}</p>
            <p><strong>Correo Contacto:</strong> {selectedInsumo.correoContacto}</p>
            <p><strong>Teléfono Contacto:</strong> {selectedInsumo.telefonoContacto}</p>
            <p><strong>Tipo de Venta:</strong> {selectedInsumo.tipoDeVenta}</p>
            <p><strong>Código Empresa:</strong> {selectedInsumo.codigoEmpresa}</p>
            <button 
              onClick={handleCloseModal} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

  
{isConfirmDeleteOpen && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <div className='flex flex-col justify-center'>
        <div className='flex justify-center'>
          <svg className="w-6 h-6 mr-2 text-2xl text-darkyellow"><FaCoffee /></svg>
          <h3 className="text-lg font-semibold mb-4 text-darkyellow">Confirmar eliminación</h3>
        </div>
        <p className="mb-4 text-center">¿Estás seguro de que deseas eliminar el Insumo "{insumoToDelete?.Nombre}"?</p>
      </div>
      <div className="flex justify-center gap-4">
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded-lg"
          onClick={closeConfirmDeleteModal} 
        >
          Cancelar
        </button>
        <button
          className="text-white bg-darkpurple px-4 py-2 rounded-lg"
          onClick={confirmDelete} 
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
)}

      <Footer />
    </div>
  );
};
 