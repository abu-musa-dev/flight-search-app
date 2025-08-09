import React from "react";

const FlightCard = ({ flight }) => {
  const itinerary = flight.itineraries[0];
  const segments = itinerary.segments;

  const departureSegment = segments[0];
  const arrivalSegment = segments[segments.length - 1];

  const stopsCount = segments.length - 1;

  const formatTime = (datetime) => datetime.split("T")[1].slice(0, 5);

  const formatDate = (datetime) => {
    const dateObj = new Date(datetime);
    const options = { weekday: "short", day: "numeric", month: "short" };
    return dateObj.toLocaleDateString("en-US", options);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 my-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
      {/* Outbound Section */}
      <section className="mb-8">
        <div className="flex justify-between text-gray-500 text-sm font-semibold mb-1">
          <span>{formatDate(departureSegment.departure.at)} • Outbound</span>
          <span
            className="text-blue-600 cursor-pointer hover:underline text-lg"
            title="Outbound flight"
          >
            ✈️
          </span>
        </div>

        <div className="flex items-center justify-between font-extrabold text-2xl text-gray-900">
          <span>{formatTime(departureSegment.departure.at)}</span>
          <span className="text-gray-400 mx-2">—</span>
          <span>{formatTime(arrivalSegment.arrival.at)}</span>
        </div>

        <div className="flex justify-between text-xl font-semibold mt-2 text-gray-800 tracking-wide">
          <span>{departureSegment.departure.iataCode}</span>
          <span>{arrivalSegment.arrival.iataCode}</span>
        </div>

        <div className="text-center mt-3 text-blue-700 text-sm font-semibold underline cursor-pointer select-none">
          {stopsCount === 0 ? (
            <span>Direct flight</span>
          ) : (
            <>
              {stopsCount} {stopsCount > 1 ? "stops" : "stop"} •{" "}
              {segments.slice(1).map((seg, i) => (
                <span key={i}>
                  {seg.departure.iataCode}
                  {i !== segments.length - 2 ? ", " : ""}
                </span>
              ))}
            </>
          )}
        </div>
        <div className="text-center mt-1 text-gray-500 italic text-xs tracking-wide">
          8 nights in New York
        </div>
      </section>

      {/* Divider */}
      <hr className="border-gray-200 mb-8" />

      {/* Inbound Section */}
      <section>
        <div className="flex justify-between text-gray-500 text-sm font-semibold mb-1">
          <span>{formatDate(arrivalSegment.arrival.at)} • Inbound</span>
          <span
            className="text-red-500 cursor-pointer hover:underline text-lg"
            title="Inbound flight"
          >
            🛬
          </span>
        </div>

        <div className="flex items-center justify-between font-extrabold text-2xl text-gray-900">
          <span>{formatTime(arrivalSegment.departure.at)}</span>
          <span className="text-gray-400 mx-2">—</span>
          <span>{formatTime(departureSegment.arrival.at)}</span>
        </div>

        <div className="flex justify-between text-xl font-semibold mt-2 text-gray-800 tracking-wide">
          <span>{arrivalSegment.departure.iataCode}</span>
          <span>{departureSegment.arrival.iataCode}</span>
        </div>

        <div className="text-center mt-3 text-blue-700 text-sm font-semibold underline cursor-pointer select-none">
          1 stop • New Delhi
        </div>
      </section>

      {/* Footer Info */}
      <footer className="flex items-center justify-between mt-8 text-gray-700 text-sm">
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-1">
            <span className="text-xl">🧳</span>
            <span>1</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-xl">👜</span>
            <span>1</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-xl">🎒</span>
            <span>1</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-yellow-100 px-4 py-1 rounded-full text-yellow-800 font-semibold text-xs select-none">
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M10 15l-5.878 3.09L5.52 12.45 1 8.36l6.127-.57L10 2l2.873 5.79 6.127.57-4.52 4.09 1.398 5.64z" />
          </svg>
          <span>Self-transfer hack</span>
        </div>
      </footer>
    </div>
  );
};

export default FlightCard;
