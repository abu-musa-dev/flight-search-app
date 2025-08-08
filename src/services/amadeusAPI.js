import axios from "axios";

const CLIENT_ID = "GAW9TyV3BixJfYTn";
const CLIENT_SECRET = "beef5xZdkd6Jna0LDqdqJOIZB2bDy2Al";

let accessToken = null;

// Function to get access token
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
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error("🔴 Access token error:", error.response?.data || error.message);
    throw error;
  }
};

// Function to search flights
export const searchFlights = async (origin, destination, departureDate, adults) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
      {
        params: {
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate: departureDate,
          adults: adults,
          max: 10,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("🔴 Flight search error: ", error.response?.data || error.message);
    throw error;
  }
};
