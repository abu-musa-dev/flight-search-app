import React, { useState } from "react";
import { searchFlights } from "../services/amadeusAPI";
import FlightCard from "./FlightCard";

const FlightSearchForm = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setResults([]);
    try {
      const flights = await searchFlights(origin, destination, departureDate, adults);
      setResults(flights);
    } catch (err) {
      setError("Flight search failed. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Flight </h2>

      <div className="mb-3">
        <label>From (e.g. DAC):</label>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value.toUpperCase())}
          className="w-full border px-2 py-1"
          placeholder="Origin Airport Code"
          required
        />
      </div>

      <div className="mb-3">
        <label>To (e.g. JFK):</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value.toUpperCase())}
          className="w-full border px-2 py-1"
          placeholder="Destination Airport Code"
          required
        />
      </div>

      <div className="mb-3">
        <label>Departure Date:</label>
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="w-full border px-2 py-1"
          required
        />
      </div>

      <div className="mb-3">
        <label>Adults:</label>
        <input
          type="number"
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
          className="w-full border px-2 py-1"
          min={1}
          required
        />
      </div>

      <button
        onClick={handleSearch}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Searching..." : "Search Flights"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-6">
        {results.length > 0 ? (
          results.map((flight, idx) => (
            <FlightCard key={idx} flight={flight} />
          ))
        ) : (
          !loading && <p className="text-gray-500 text-center">No flights found</p>
        )}
      </div>
    </div>
  );
};

export default FlightSearchForm;
