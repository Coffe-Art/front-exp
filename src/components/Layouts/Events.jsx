import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Footer } from './Footer';
import { Header } from './Header';

export const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([
    { id: 1, name: 'Music Festival', date: new Date('2024-07-30'), location: { lat: 37.7749, lng: -122.4194 }, companies: ['Company A', 'Company B'], duration: '4 hours', place: 'Central Park' },
    { id: 2, name: 'Craft Fair', date: new Date('2024-07-31'), location: { lat: 37.7749, lng: -122.4194 }, companies: ['Company C', 'Company D'], duration: '3 hours', place: 'Market Street' },
    { id: 3, name: 'Food Truck Rally', date: new Date('2024-08-01'), location: { lat: 37.7849, lng: -122.4094 }, companies: ['Company E', 'Company F'], duration: '5 hours', place: 'Union Square' },
  ]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const today = new Date();
    const ongoingEvents = events.filter(event => event.date.toDateString() === today.toDateString());
    setCurrentEvents(ongoingEvents);
  }, [events]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <Header />

      <div className="flex flex-col min-h-screen p-4 md:p-8 bg-gray-200">
        {/* Current Event Message */}
        {currentEvents.length > 0 && (
          <div className="bg-green-500 text-white text-center p-2 rounded-lg shadow-md mx-auto mb-4 max-w-md">
            {currentEvents.map(event => (
              <span key={event.id} className="block">{event.name} is happening right now</span>
            ))}
          </div>
        )}

        <section className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center md:items-start">
            {/* Search */}
            <input
              type="text"
              placeholder="Search places"
              className="p-2 rounded border mb-4 w-full max-w-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Map */}
            <div className="w-full max-w-full mt-8">
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '400px' }}
                  center={{ lat: 37.7749, lng: -122.4194 }}
                  zoom={10}
                >
                  {events.map(event => (
                    <Marker
                      key={event.id}
                      position={event.location}
                      onClick={() => handleEventClick(event)}
                    />
                  ))}
                </GoogleMap>
              </LoadScript>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
            {/* Title and Description */}
            <h2 className="text-2xl font-bold mt-6 text-center md:text-left">Special Events</h2>
            <p className="text-center md:text-left max-w-2xl mt-2">
              Here you can see the special events that will take place in Circacia. Discover what's happening and participate in them.
            </p>

            {/* Event Invitations */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-8">
              {events.map(event => (
                <div
                  key={event.id}
                  className="border rounded-lg p-4 shadow-md bg-white cursor-pointer"
                  onClick={() => handleEventClick(event)}
                >
                  <h3 className="font-semibold">{event.name}</h3>
                  <p>{event.date.toDateString()}</p>
                  <p>Location: {event.location.lat}, {event.location.lng}</p>
                </div>
              ))}
            </div>

            {/* Calendar */}
            <div className="mt-8">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileClassName={({ date }) => {
                  const hasEvent = events.some(event => event.date.toDateString() === date.toDateString());
                  return hasEvent ? 'bg-yellow-300' : null;
                }}
              />
            </div>
          </div>
        </section>

        {/* Event Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
              <h3 className="text-xl font-semibold mb-4">{selectedEvent.name}</h3>
              <p><strong>Date:</strong> {selectedEvent.date.toDateString()}</p>
              <p><strong>Location:</strong> {selectedEvent.place}</p>
              <p><strong>Duration:</strong> {selectedEvent.duration}</p>
              <p><strong>Companies Attending:</strong> {selectedEvent.companies.join(', ')}</p>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
};
