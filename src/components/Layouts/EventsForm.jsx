import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import BackgroundImage from '../../assets/BackgroundLogin.jpg'; // Ajusta la ruta según tu estructura de proyecto
import Logo from '../../assets/Artesanías.png'; // Ajusta la ruta según tu estructura de proyecto

export const EventsForm = () => {
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: new Date(),
    location: { lat: '', lng: '' },
    companies: [],
    duration: '',
    place: ''
  });

  const handleNewEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prevEvent => ({
      ...prevEvent,
      [name]: value
    }));
  };

  const handleNewEventSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para manejar el envío del formulario
    console.log('Event Submitted:', newEvent);
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ 
        backgroundImage: `url(${BackgroundImage})`, 
      }}
    >
      <div className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-4 sm:mx-8 md:mx-16 lg:mx-32">
        <img src={Logo} alt="Logo" className="h-24 w-24 mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-6 text-center">Agregar Nuevo Evento</h2>
        
        <form onSubmit={handleNewEventSubmit}>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
              Nombre del Evento
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newEvent.name}
              onChange={handleNewEventChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nombre del Evento"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="date">
              Fecha
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={newEvent.date.toISOString().split('T')[0]}
              onChange={e => setNewEvent(prevEvent => ({
                ...prevEvent,
                date: new Date(e.target.value)
              }))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="lat">
              Latitud de Ubicación
            </label>
            <input
              type="number"
              id="lat"
              name="lat"
              value={newEvent.location.lat}
              onChange={(e) => setNewEvent(prevEvent => ({
                ...prevEvent,
                location: { ...prevEvent.location, lat: parseFloat(e.target.value) }
              }))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Latitud"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="lng">
              Longitud de Ubicación
            </label>
            <input
              type="number"
              id="lng"
              name="lng"
              value={newEvent.location.lng}
              onChange={(e) => setNewEvent(prevEvent => ({
                ...prevEvent,
                location: { ...prevEvent.location, lng: parseFloat(e.target.value) }
              }))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Longitud"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="companies">
              Empresas (separadas por comas)
            </label>
            <input
              type="text"
              id="companies"
              name="companies"
              value={newEvent.companies.join(', ')}
              onChange={(e) => setNewEvent(prevEvent => ({
                ...prevEvent,
                companies: e.target.value.split(',').map(company => company.trim())
              }))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Empresas"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="duration">
              Duración
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={newEvent.duration}
              onChange={handleNewEventChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Duración"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="place">
              Lugar
            </label>
            <input
              type="text"
              id="place"
              name="place"
              value={newEvent.place}
              onChange={handleNewEventChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Lugar"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Agregar Evento
          </button>

          <p className="mt-4 text-center">
            <NavLink to="/events" className="text-blue-500 font-bold hover:underline">
              Regresar a Eventos
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};
