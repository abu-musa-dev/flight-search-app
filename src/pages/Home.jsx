// src/pages/Home.jsx
import { useState } from "react";
import { searchFlights } from "../services/amadeusAPI";
import FlightCard from "../components/FlightCard";

const Home = () => {
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    date: "",
    passengers: 1,
  });

  const [flights, setFlights] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await searchFlights(form);
    setFlights(data);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Flight Search</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="origin" placeholder="Origin" value={form.origin} onChange={handleChange} required />
        <input name="destination" placeholder="Destination" value={form.destination} onChange={handleChange} required />
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <input type="number" name="passengers" value={form.passengers} min="1" onChange={handleChange} required />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">Search</button>
      </form>

      <div className="mt-8">
        {flights.map((flight, idx) => (
          <FlightCard key={idx} flight={flight} />
        ))}
      </div>
    </div>
  );
};

export default Home;
