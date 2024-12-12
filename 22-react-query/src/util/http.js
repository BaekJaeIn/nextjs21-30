import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchAllEvents() {
  const response = await fetch(
    "https://react-http-20885-default-rtdb.asia-southeast1.firebasedatabase.app/22-react-query/events.json"
  );
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch events.");
  }

  return resData.events;
}

export async function fetchEvents({ signal, searchTerm, max }) {
  let url =
    "https://react-http-20885-default-rtdb.asia-southeast1.firebasedatabase.app/22-react-query/events.json";

  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  let { events } = await response.json();

  if (max) {
    events = events.slice(0, max);
  }
  if (searchTerm) {
    events = events.filter((event) => {
      const searchableText = `${event.title} ${event.description} ${event.location}`;
      return searchableText.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  return events;
}

export async function updateEvent(events) {
  const response = await fetch(
    `https://react-http-20885-default-rtdb.asia-southeast1.firebasedatabase.app/22-react-query/events.json`,
    {
      method: "PUT",
      body: JSON.stringify({ events }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const error = new Error("An error occurred while creating the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function fetchSelectableImages({ signal }) {
  const response = await fetch(
    `https://react-http-20885-default-rtdb.asia-southeast1.firebasedatabase.app/22-react-query/events.json`,
    {
      signal,
    }
  );

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the images");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();

  return images;
}

export async function fetchEvent({ id, signal }) {
  const response = await fetch(
    `https://react-http-20885-default-rtdb.asia-southeast1.firebasedatabase.app/22-react-query/events.json`,
    {
      signal,
    }
  );

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  const event = events.filter((event) => event.id == id);

  return event[0];
}
