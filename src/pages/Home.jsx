import React, { useState } from "react";
import { searchFlights } from "../services/amadeusAPI";
import FlightCard from "../components/FlightCard";
import Spinner from "../../shared/Spinner";
import Hero from "../sections/Hero";
import { FaPlaneDeparture, FaPlaneArrival, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  // Form state for user input
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    date: null,
    passengers: 1,
  });

  // State to hold search results, errors and loading status
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes: uppercase airport codes and number for passengers
  const handleChange = (e) => {
    let value =
      e.target.name === "passengers"
        ? Number(e.target.value)
        : e.target.value.toUpperCase();

    // Prevent airport codes longer than 3 characters
    if (
      (e.target.name === "origin" || e.target.name === "destination") &&
      value.length > 3
    )
      return;

    setForm({ ...form, [e.target.name]: value });
  };

  // Handle date picker changes
  const handleDateChange = (date) => {
    setForm({ ...form, date });
  };

  // Handle form submission to search flights
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setFlights([]);

    // Format the date to yyyy-MM-dd string if selected
    const formattedDate = form.date
      ? form.date.toISOString().split("T")[0]
      : "";

    try {
      // Call API to search flights
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
      {/* Hero section at the top */}
      <Hero />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        {/* Main card container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto bg-white border border-gray-200 p-6 sm:p-10 rounded-xl shadow-md"
        >
          {/* Page title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-10">
            ✈ Flight Search
          </h1>

          {/* Flight search form */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-12 gap-4 sm:gap-6 mb-8 sm:mb-10"
            autoComplete="off"
          >
            {/* Origin input */}
            <div className="col-span-6 relative pr-2 sm:col-span-3 sm:pr-0">
              <FaPlaneDeparture className="absolute left-3 top-3.5 text-gray-500 text-base sm:text-lg" />
              <input
                name="origin"
                placeholder="From (e.g. DAC)"
                value={form.origin}
                onChange={handleChange}
                required
                maxLength={3}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#008F7B] text-center text-base sm:text-lg placeholder-gray-400"
              />
            </div>

            {/* Destination input */}
            <div className="col-span-6 relative pl-2 sm:col-span-3 sm:pl-0">
              <FaPlaneArrival className="absolute left-3 top-3.5 text-gray-500 text-base sm:text-lg" />
              <input
                name="destination"
                placeholder="To (e.g. JFK)"
                value={form.destination}
                onChange={handleChange}
                required
                maxLength={3}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#008F7B] text-center text-base sm:text-lg placeholder-gray-400"
              />
            </div>

            {/* Date picker */}
            <div className="col-span-6 relative pr-2 sm:col-span-3 sm:pr-0">
              <DatePicker
                selected={form.date}
                onChange={handleDateChange}
                minDate={new Date()}
                placeholderText="Select a date"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#008F7B] placeholder-gray-400"
                dateFormat="yyyy-MM-dd"
                popperPlacement="bottom-start"
                showPopperArrow={false}
              />
            </div>

            {/* Passengers input */}
            <div className="col-span-6 relative pl-2 sm:col-span-2 sm:pl-0">
              <FaUsers className="absolute left-3 top-3.5 text-gray-500 text-base sm:text-lg" />
              <input
                type="number"
                name="passengers"
                min="1"
                value={form.passengers}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#008F7B] text-center text-base sm:text-lg placeholder-gray-400"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="col-span-12 sm:col-span-1 bg-[#008F7B] text-white font-semibold rounded-lg px-6 py-3 hover:bg-[#006f5a] transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {/* Show error message */}
          {error && (
            <p className="text-red-600 text-center font-medium mb-6">{error}</p>
          )}

          {/* Flight results */}
          {loading ? (
            <div className="flex justify-center py-10">
              <Spinner size={60} thickness={5} />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {flights.length > 0 ? (
                flights.map((flight, idx) => (
                  <FlightCard key={idx} flight={flight} />
                ))
              ) : (
                !error && (
                  <p className="text-center italic text-gray-500 col-span-2">
                    No flights found.
                  </p>
                )
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
