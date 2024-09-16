import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Header } from '../ForView/Header';
import { Footer } from '../ForView/Footer';
import { FaPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

export const MaterialsForAdmin = () => {
  // Datos para la tabla
  const tableData = [
    {
      IdInsumo: 1,
      Nombre: 'Lana',
      cantidadInsumo: 100,
      precioUnitario: 10,
      precioPorKilo: 50,
      descripcion: 'Descripción 1',
      lugarDeVenta: 'Lugar 1',
      correoContacto: 'contacto1@example.com',
      TelefonoContacto: '123456789',
      TipoDeVenta: 'Por kilo',
      codigoEmpresa: 'EMP001',
    },
    {
      IdInsumo: 2,
      Nombre: 'Madera',
      cantidadInsumo: 200,
      precioUnitario: 20,
      precioPorKilo: 100,
      descripcion: 'Descripción 2',
      lugarDeVenta: 'Lugar 2',
      correoContacto: 'contacto2@example.com',
      TelefonoContacto: '987654321',
      TipoDeVenta: 'Por unidad',
      codigoEmpresa: 'EMP002',
    },
    // Agregar más datos de insumos según sea necesario
  ];

  // Estado para la modal
  const [selectedInsumo, setSelectedInsumo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Funciones de manejo de eventos
  const handleEdit = (id) => {
    console.log('Edit insumo with ID:', id);
    // Implementar la lógica de edición
  };

  const handleDelete = (id) => {
    console.log('Delete insumo with ID:', id);
    // Implementar la lógica de eliminación
  };

  const handleOpenModal = (insumo) => {
    setSelectedInsumo(insumo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedInsumo(null);
    setIsModalOpen(false);
  };

  // Extraer los nombres de los insumos y las cantidades para el gráfico
  const labels = tableData.map(item => item.Nombre);
  const dataValues = tableData.map(item => item.cantidadInsumo);

  // Datos para el gráfico de barras
  const barData = {
    labels: labels,
    datasets: [
      {
        label: 'Cantidad de Insumo',
        data: dataValues, // Datos para el gráfico
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
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

  return (
    <div className="min-h-screen bg-gray-200 font-sans">
      <Header />
      <div className="text-center">
        <h2 className="text-darkyellow text-4xl font-bold mt-6 mb-10">Insumos</h2>
        <p className="max-w-2xl mt-2 mx-auto text-lg mb-5">
          ¡Bienvenido, artesano! Este espacio está diseñado para que puedas anotar y llevar gestion de los materiales / insumos que compras para hacer tus artesanias.
          <br /><br />
          Podrás llevar un registro detallado de los materiales que compras para tus artesanías, ayudándote a gestionar de manera fácil tus recursos y tener siempre a mano la información que necesitas para tus creaciones.
        </p>
      </div>
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
            <button className='flex flex-row align-baseline text-3xl text-darkyellow'>
              <p className="mr-2 flex justify-center align-baseline" /><span className='font-bold text-3xl'> + </span> Agregar Insumo
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
                  <th className="px-4 py-2">Acciones</th> {/* Nueva columna para acciones */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((item) => (
                  <tr key={item.IdInsumo} onClick={() => handleOpenModal(item)} className="cursor-pointer hover:bg-gray-100">
                    <td className="px-2 py-2 text-xl">{item.IdInsumo}</td>
                    <td className="px-3 py-2 text-xl">{item.Nombre}</td>
                    <td className="px-4 py-2 text-xl">{item.cantidadInsumo}</td>
                    <td className="px-4 py-2 text-xl">{item.precioUnitario}</td>
                    <td className="px-4 py-2 text-xl">{item.precioPorKilo}</td>
                    <td className="px-4 py-2 text-xl">{item.descripcion}</td>
                    <td className="px-4 py-2 text-xl">{item.lugarDeVenta}</td>
                    <td className="px-4 py-2 text-xl">{item.correoContacto}</td>
                    <td className="px-4 py-2 text-xl">{item.TelefonoContacto}</td>
                    <td className="px-4 py-2 text-xl">{item.TipoDeVenta}</td>
                    <td className="px-4 py-2 text-xl">{item.codigoEmpresa}</td>
                    <td className="px-4 py-2 flex space-x-2"> {/* Botones de acción */}
                      <button onClick={() => handleEdit(item.IdInsumo)} className="text-darkyellow hover:text-lightyellow text-3xl">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(item.IdInsumo)} className="text-darkpurple hover:text-lightpurple text-3xl">
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

      {/* Modal */}
      {isModalOpen && selectedInsumo && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Detalles de {selectedInsumo.Nombre}</h2>
            <p><strong>Cantidad:</strong> {selectedInsumo.cantidadInsumo}</p>
            <p><strong>Precio Unitario:</strong> {selectedInsumo.precioUnitario}</p>
            <p><strong>Precio por Kilo:</strong> {selectedInsumo.precioPorKilo}</p>
            <p><strong>Descripción:</strong> {selectedInsumo.descripcion}</p>
            <p><strong>Lugar de Venta:</strong> {selectedInsumo.lugarDeVenta}</p>
            <p><strong>Correo Contacto:</strong> {selectedInsumo.correoContacto}</p>
            <p><strong>Teléfono Contacto:</strong> {selectedInsumo.TelefonoContacto}</p>
            <p><strong>Tipo de Venta:</strong> {selectedInsumo.TipoDeVenta}</p>
            <p><strong>Código Empresa:</strong> {selectedInsumo.codigoEmpresa}</p>
            <button onClick={handleCloseModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Cerrar
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
