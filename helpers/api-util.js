// Fetch all events from Firebase
export async function getAllEvents() {
  const response = await fetch(
    "https://nextjs-course-ad988-default-rtdb.firebaseio.com/events.json",
  );
  const data = await response.json();

  const events = [];

  // Convert the Firebase object into an array
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

// Return only the featured events
export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

// Find an event by its id
export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

// Return events that match the selected year and month
export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
