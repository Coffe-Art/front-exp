import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Header } from './Header';
import { Footer } from './Footer';
import { NavLink, useLocation } from 'react-router-dom';
import { FaSearch, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import Fondo from '../../assets/FondoEmpresas.png'; // Asegúrate de que la ruta sea correcta

const containerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 37.7749,
  lng: -122.4194
};

export const EventsForAdmin = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const location = useLocation(); // Hook para detectar cambios en la ruta

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const idAdministrador = localStorage.getItem('userId'); // Asegúrate de que 'userId' es el nombre correcto

        if (!token || !idAdministrador) {
          console.error('Token o ID de administrador no encontrados en el localStorage');
          return;
        }

        const response = await fetch(`https://checkpoint-9tp4.onrender.com/api/evento/admin/${idAdministrador}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Eventos obtenidos:', data); // Verifica los datos
        setEvents(data);
      } catch (error) {
        console.error('Error al obtener eventos:', error.message);
      }
    };

    fetchEvents();
  }, [location.pathname]); // Ejecutar cuando cambie la ruta

  useEffect(() => {
    const today = new Date();
    const ongoingEvents = events.filter(event => new Date(event.fecha).toDateString() === today.toDateString());
    console.log('Eventos actuales:', ongoingEvents); // Verifica los eventos actuales
    setCurrentEvents(ongoingEvents);
  }, [events]);

  const filteredEvents = events.filter(event =>
    event.nombreEvento.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log('Eventos filtrados:', filteredEvents); // Verifica los eventos filtrados

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const handleEditEvent = () => {
    if (selectedEvent) {
      // Lógica para editar el evento
      // Redirige al formulario con los datos del evento seleccionado para su edición
      window.location.href = `/EventsForm?id=${selectedEvent.idEvento}`;
    }
  };

  const handleDeleteEvent = async () => {
    if (selectedEvent) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://checkpoint-9tp4.onrender.com/api/evento/${selectedEvent.idEvento}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        setEvents(events.filter(event => event.idEvento !== selectedEvent.idEvento));
        setSelectedEvent(null);
        alert('Evento eliminado correctamente');
      } catch (error) {
        console.error('Error al eliminar evento:', error.message);
        alert('Hubo un problema al eliminar el evento');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 font-sans">
      <Header />

      <div className="flex flex-col min-h-screen p-4 md:p-8 bg-gray-200">
        {/* Current Event Message */}
        {currentEvents.length > 0 && (
          <div className="bg-green-500 text-white text-center p-4 rounded-lg shadow-md mx-auto mb-6 max-w-md text-base">
            {currentEvents.map(event => (
              <span key={event.idEvento} className="block">{event.nombreEvento} está ocurriendo justo ahora.</span>
            ))}
          </div>
        )}

        <section className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center md:items-start">
            {/* Search */}
            <div className="w-full max-w-full mb-6 relative">
              <input
                type="text"
                placeholder="Ingresa el evento que buscas"
                className="w-full p-3 pl-12 rounded border text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
            </div>

            {/* Map */}
            <div className="w-full max-w-full mt-8">
              <LoadScript googleMapsApiKey="AIzaSyB39DzLofNtQbUQSlwfqEfyuD0Eyo0Q1NU">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={12}
                >
                  {filteredEvents.map(event => (
                    <Marker
                      key={event.idEvento}
                      position={{ lat: event.ubicacion.lat, lng: event.ubicacion.lng }}
                      onClick={() => handleEventClick(event)}
                    />
                  ))}
                </GoogleMap>
              </LoadScript>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-center">
            {/* Centered Title and Paragraph */}
            <div className="text-center">
              <h2 className="text-darkyellow text-4xl font-bold mt-6">Eventos Especiales</h2>
              <p className="max-w-2xl mt-2 mx-auto text-lg">
                Aquí puedes ver los eventos especiales que tendrán lugar en Circacia. Descubre qué está pasando y participa en ellos.
              </p>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-8">
              {filteredEvents.map(event => (
                <div
                  key={event.idEvento}
                  className="border rounded-lg p-6 shadow-md bg-white cursor-pointer text-base"
                  onClick={() => handleEventClick(event)}
                >
                  <h3 className="font-semibold text-xl">{event.nombreEvento}</h3>
                  <p className="text-sm">{new Date(event.fecha).toDateString()}</p>
                  <p className="text-sm">Ubicación: {event.ubicacion.lat}, {event.ubicacion.lng}</p>
                </div>
              ))}
            </div>

            {/* Create New Event Container */}
            <div className="border rounded-lg p-6 shadow-md bg-white mt-8 max-w-md mx-auto text-base">
              <h3 className="text-xl font-semibold mb-4">¿Quieres crear un nuevo evento?</h3>
              <p className="mb-4">
                <NavLink to="/EventsForm" className="text-darkyellow font-bold hover:underline">
                  Agregar Evento
                </NavLink>
              </p>
            </div>

            {/* Calendar */}
            <div className="mt-8 text-base">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileClassName={({ date }) => {
                  const hasEvent = filteredEvents.some(event => new Date(event.fecha).toDateString() === date.toDateString());
                  return hasEvent ? 'bg-yellow-300' : null;
                }}
              />
            </div>
          </div>
        </section>

        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-lg relative p-6">
              <div
                className="relative w-full h-32 bg-cover bg-center rounded-t-lg"
                style={{ backgroundImage: `url(${Fondo})` }}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                >
                  <FaTimes />
                </button>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-semibold text-white">{selectedEvent.nombreEvento}</h3>
                </div>
              </div>

              <div className="mt-4">
                <p><strong>Fecha:</strong> {new Date(selectedEvent.fecha).toDateString()}</p>
                <p><strong>Ubicación:</strong> {selectedEvent.ubicacion}</p>
                <p><strong>Duración:</strong> {selectedEvent.duracion}</p>
                <p><strong>Lugar:</strong> {selectedEvent.lugar}</p>
                <p><strong>Descripción:</strong> {selectedEvent.descripcion}</p>
                <p><strong>Empresas Asistentes:</strong> {selectedEvent.empresasAsistente.join(', ')}</p>
              </div>

              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={handleEditEvent}
                  className="text-blue-500 hover:text-blue-700 flex items-center"
                >
                  <FaEdit className="mr-2" /> Editar
                </button>
                <button
                  onClick={handleDeleteEvent}
                  className="text-red-500 hover:text-red-700 flex items-center"
                >
                  <FaTrash className="mr-2" /> Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
