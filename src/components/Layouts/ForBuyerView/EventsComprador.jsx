import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Header } from '../ForView/Header';
import { Footer } from '../ForView/Footer';
import { NavLink, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Fondo from '../../../assets/FondoEmpresas.png';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import { format } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const containerStyle = {
  width: '100%',
  height: '600px',
};

const defaultCenter = {
  lat: 4.5709,
  lng: -74.2973,
};

const geocodeAddress = async (address) => {
  const geocoder = new google.maps.Geocoder();
  return new Promise((resolve, reject) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        const { lat, lng } = results[0].geometry.location;
        resolve({ lat: lat(), lng: lng() });
      } else {
        reject(new Error(`Geocode was not successful for the following reason: ${status}`));
      }
    });
  });
};

export const EventsComprador = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [highlightedDates, setHighlightedDates] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`https://checkpoint-9tp4.onrender.com/api/comprador/ver/eventos`);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Eventos obtenidos:', data);

        const eventos = Array.isArray(data[0]) ? data[0] : data; 
        setEvents(eventos);

        // Extraer fechas de eventos y convertirlas a un formato adecuado
        const dates = eventos.map(event => new Date(event.fecha).toDateString());
        setHighlightedDates(dates);
      } catch (error) {
        console.error('Error al obtener eventos:', error.message);
      }
    };

    fetchEvents();
  }, [location.pathname]);

  const filteredEvents = events
    .filter(event => event.nombreEvento)
    .filter(event => event.nombreEvento.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleEventClick = async (event) => {
    try {
      console.log('Evento seleccionado:', event);

      const address = event.ubicacion;
      if (!address || typeof address !== 'string' || address.trim() === '') {
        console.error('Dirección del evento no válida:', address);
        return;
      }
      
      const { lat, lng } = await geocodeAddress(address);
      
      if (typeof lat !== 'number' || typeof lng !== 'number') {
        console.error('Coordenadas inválidas:', lat, lng);
        return;
      }
      
      setMapCenter({ lat, lng });
      setSelectedEvent(event);
    } catch (error) {
      console.error('Error al obtener las coordenadas del evento:', error.message);
    }
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toDateString();
      return highlightedDates.includes(dateString) ? 'bg-yellow-200 text-black' : null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 font-sans">
      <Header />

      <div className="flex flex-col min-h-screen p-4 md:p-8 bg-gray-200">
        <section className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center md:items-start">
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

            <div className="w-full max-w-full mt-5">
              <LoadScript googleMapsApiKey="AIzaSyDlmwtbA4RlJtcDndjLKwzExz_cChUSMrk" loadingElement={<div>Loading...</div>}>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={mapCenter}
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
                  style={{ aspectRatio: '1 / 1' }}
                  onClick={() => handleEventClick(event)}
                >
                  <h3 className="font-semibold text-xl">{event.nombreEvento}</h3>
                  <p className="text-sm">{formatDate(event.fecha)}</p>
                  <p className="text-sm">{event.descripcion}</p>
                  <p className="text-sm">Empresa Asistente: {event.empresasAsistente}</p>
                </div>
              ))}
            </div>

            <div className="border rounded-lg p-6 shadow-md bg-white mt-8 max-w-md mx-auto text-base">
              <h3 className="text-xl font-semibold mb-4">Calendario de Eventos</h3>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                className="react-calendar"
                tileClassName={tileClassName}
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
                  &times;
                </button>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-semibold text-white">{selectedEvent.nombreEvento}</h3>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white rounded-b-lg">
                <p><strong>Fecha: </strong> {formatDate(selectedEvent.fecha)}</p>
                <p><strong>Ubicación: </strong> {selectedEvent.ubicacion}</p>
                <p><strong>Duración: </strong> {selectedEvent.duracion}</p>
                <p><strong>Empresas Participantes: </strong> {selectedEvent.empresasAsistente}</p>
                <p><strong className='mb-3 '>Descripción: </strong> {selectedEvent.descripcion}</p>
                <button
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded mt-3"
                >
                  Cerrar
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
