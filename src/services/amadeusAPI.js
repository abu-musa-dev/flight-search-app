import axios from "axios";

const CLIENT_ID = "GAW9TyV3BixJfYTn";
const CLIENT_SECRET = "beef5xZdkd6Jna0LDqdqJOIZB2bDy2Al";

let accessToken = null;

const getAccessToken = async () => {
  if (accessToken) return accessToken;

  try {
    const response = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error("Access Token Error:", error.response?.data || error.message);
    throw error;
  }
};

export const searchFlights = async (origin, destination, departureDate, adults) => {
  const token = await getAccessToken();

  try {
    const response = await axios.get("https://test.api.amadeus.com/v2/shopping/flight-offers", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate,
        adults,
        max: 5,
      },
    });

    return response.data.data; // এখানে মূল ফ্লাইট ডাটা আছে
  } catch (error) {
    console.error("Flight Search Error:", error.response?.data || error.message);
    throw error;
  }
};
