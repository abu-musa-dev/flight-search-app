import React, { useState } from "react";
import { searchFlights } from "../services/amadeusAPI";
import FlightCard from "../components/FlightCard";
import Spinner from "../../shared/Spinner";
import Hero from "../sections/Hero";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    date: null, // Date object now
    passengers: 1,
  });

  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    let value =
      e.target.name === "passengers"
        ? Number(e.target.value)
        : e.target.value.toUpperCase();

    if (
      (e.target.name === "origin" || e.target.name === "destination") &&
      value.length > 3
    )
      return;

    setForm({ ...form, [e.target.name]: value });
  };

  // handle DatePicker change
  const handleDateChange = (date) => {
    setForm({ ...form, date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setFlights([]);

    // Format date to yyyy-MM-dd string before sending to API (if needed)
    const formattedDate = form.date
      ? form.date.toISOString().split("T")[0]
      : "";

    try {
      const data = await searchFlights({ ...form, date: formattedDate });
      if (!data || data.length === 0) {
        setError("No flights found for the given criteria.");
      } else {
        setFlights(data);
      }
    } catch (err) {
      setError("Flight search failed. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Hero />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 ">
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
            Flight Search
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-12 gap-4 mb-8"
            autoComplete="off"
          >
            <input
              name="origin"
              placeholder="From (e.g. DAC)"
              value={form.origin}
              onChange={handleChange}
              required
              maxLength={3}
              className="col-span-12 sm:col-span-3 border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-xl font-semibold"
            />

            <input
              name="destination"
              placeholder="To (e.g. JFK)"
              value={form.destination}
              onChange={handleChange}
              required
              maxLength={3}
              className="col-span-12 sm:col-span-3 border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-xl font-semibold"
            />

            {/* React Datepicker */}
            <div className="col-span-12 sm:col-span-3">
              <DatePicker
                selected={form.date}
                onChange={handleDateChange}
                minDate={new Date()}
                placeholderText="Select a date"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                dateFormat="yyyy-MM-dd"
                popperPlacement="bottom-start"
                showPopperArrow={false}
              />
            </div>

            <input
              type="number"
              name="passengers"
              min="1"
              value={form.passengers}
              onChange={handleChange}
              required
              className="col-span-6 sm:col-span-2 border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-xl font-semibold"
            />

            <button
              type="submit"
              disabled={loading}
              className={`col-span-6 sm:col-span-1 bg-blue-600 text-white font-bold rounded px-6 py-3 transition hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed`}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {error && (
            <p className="text-red-600 text-center font-semibold mb-6">{error}</p>
          )}

          {loading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {flights.length > 0 ? (
                flights.map((flight, idx) => (
                  <FlightCard key={idx} flight={flight} />
                ))
              ) : (
                !error && (
                  <p className="text-center italic text-gray-600 col-span-2">
                    No flights found.
                  </p>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
