import axios from "axios";

// তোমার Postman থেকে পাওয়া Access Token এখানে বসাও (ডেভেলপমেন্টের জন্য)
const ACCESS_TOKEN = "YOUR_AMADEUS_ACCESS_TOKEN";

export async function searchFlights({ origin, destination, date, passengers }) {
  try {
    const response = await axios.get("https://test.api.amadeus.com/v2/shopping/flight-offers", {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      params: {
        originLocationCode: origin.toUpperCase(),
        destinationLocationCode: destination.toUpperCase(),
        departureDate: date,
        adults: passengers,
        max: 5,
      },
    });
    return response.data.data || [];
  } catch (error) {
    console.error("Flight search error:", error);
    return [];
  }
}
