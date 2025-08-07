const API_URL = "https://test.api.amadeus.com/v2/shopping/flight-offers";
const TOKEN = "your_sandbox_access_token"; // Replace with real token

export const searchFlights = async ({ origin, destination, date, passengers }) => {
  try {
    const res = await fetch(`${API_URL}?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}&adults=${passengers}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};
