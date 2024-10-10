const getAllEvents = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/events");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("⚠️ error fetching events", error);
  }
};

const getEventsById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/events/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("⚠️ error fetching events", error);
  }
};

export default {
  getAllEvents,
  getEventsById,
};
