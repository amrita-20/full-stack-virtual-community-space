import React, { useEffect, useState } from "react";
import eventsApi from "../services/EventsAPI";
import locationApi from "../services/LocationsAPI";
import Event from "../components/Event";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await eventsApi.getAllEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await locationApi.getAllLocations();
      setLocations(data);
    };
    fetchLocations();
  }, []);

  const filterEvents = async (locationId) => {
    if (locationId === "all") {
      const allEvents = await eventsApi.getAllEvents();
      setEvents(allEvents);
      return;
    }
    const filteredEvents = await eventsApi.getEventsById(locationId);
    setEvents(filteredEvents);
  };
  const handleSelect = (e) => {
    filterEvents(e.target.value);
  };
  return (
    <div className='all-events-main"'>
      <div className="event-filters">
        <select name="location" id="location" onChange={handleSelect}>
          <option value="all">See events at</option>
          {locations.map((location) => (
            <option key={location.location_id} value={location.location_id}>
              {location.name}
            </option>
          ))}
        </select>
        <button onClick={() => filterEvents("all")}>SHOW ALL EVENTS</button>
      </div>
      <div className="all-events">
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
      </div>
    </div>
  );
};

export default Events;
