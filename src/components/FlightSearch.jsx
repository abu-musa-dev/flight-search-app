import React, { useState } from "react";
import axios from "axios";

const ACCESS_TOKEN = "beef5xZdkd6Jna0LDqdqJOIZB2bDy2Al"; // এখানেই সরাসরি Token বসানো হয়েছে

const FlightSearch = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [flights, setFlights] = useState([]);

  const searchFlights = async () => {
    try {
      const response = await axios.get("https://test.api.amadeus.com/v2/shopping/flight-offers", {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        params: {
          originLocationCode: origin.toUpperCase(),
          destinationLocationCode: destination.toUpperCase(),
          departureDate,
          adults: passengers,
          max: 5,
        },
      });

      setFlights(response.data.data || []);
    } catch (error) {
      console.error("❌ Flight search error:", error);
      setFlights([]);
    }
  };

  return (
    <div className="flight-search">
      <h2>✈️ Flight Search</h2>
      <div>
        <input
          type="text"
          placeholder="Origin (e.g., DAC)"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination (e.g., JFK)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
        <input
          type="number"
          value={passengers}
          min={1}
          onChange={(e) => setPassengers(e.target.value)}
        />
        <button onClick={searchFlights}>Search Flights</button>
      </div>

      {flights.length > 0 ? (
        <ul>
          {flights.map((flight, index) => (
            <li key={index}>
              <strong>From:</strong> {flight.itineraries[0].segments[0].departure.iataCode} -{" "}
              <strong>To:</strong> {flight.itineraries[0].segments[0].arrival.iataCode} <br />
              <strong>Price:</strong> {flight.price.total} {flight.price.currency}
            </li>
          ))}
        </ul>
      ) : (
        <p>No flights found.</p>
      )}
    </div>
  );
};

export default FlightSearch;
