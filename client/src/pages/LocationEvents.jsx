import React, { useState, useEffect } from "react";
import Event from "../components/Event";
import "../css/LocationEvents.css";
import LocationEventsAPI from "../services/EventsAPI";

const LocationEvents = ({ id, name }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await LocationEventsAPI.getEventsById(id);
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <div className="location-events">
      <header>
        <div className="location-info">
          <h2>{name}</h2>
        </div>
      </header>

      <main>
        {events && events.length > 0 ? (
          events.map((event, index) => (
            <Event
              key={event.event_id}
              id={event.event_id}
              title={event.name}
              date={event.date}
              time={event.time}
              status={event.status}
              image={event.image}
            />
          ))
        ) : (
          <h2>
            <i className="fa-regular fa-calendar-xmark fa-shake"></i>{" "}
            {"No events scheduled at this location yet!"}
          </h2>
        )}
      </main>
    </div>
  );
};

export default LocationEvents;
