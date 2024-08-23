import React from 'react';

const EventList = ({ events }) => {
  return (
    <div>
      {events.map((event) => (
        <div
          key={event.id}
          className="border rounded-lg p-6 shadow-md bg-white cursor-pointer text-base"
        >
          <h3 className="font-semibold text-xl">{event.name}</h3>
          <p className="text-sm">{new Date(event.date).toDateString()}</p>
          <p className="text-sm">Ubicación: {event.location.lat}, {event.location.lng}</p>
        </div>
      ))}
    </div>
  );
};

export default EventList;
