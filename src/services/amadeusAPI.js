import axios from "axios";

// Hardcoded API keys (NOT secure for production)
const CLIENT_ID = "pTk8lo13BSl3A6JxVuR9cwWv8BOQWTFS";
const CLIENT_SECRET = "OSPxgRFXd4XzpOLq";

let accessToken = null;
let tokenExpiry = null;

const getAccessToken = async () => {
  const now = Date.now();

  if (accessToken && tokenExpiry && now < tokenExpiry) {
    return accessToken;
  }

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
    tokenExpiry = now + response.data.expires_in * 1000;

    return accessToken;
  } catch (error) {
    console.error("Access Token Error:", error.response?.data || error.message);
    throw error;
  }
};

export const searchFlights = async ({ origin, destination, date, passengers }) => {
  const token = await getAccessToken();

  try {
    const response = await axios.get("https://test.api.amadeus.com/v2/shopping/flight-offers", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate: date,
        adults: passengers,
        max: 5,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Flight Search Error:", error.response?.data || error.message);
    throw error;
  }
};
