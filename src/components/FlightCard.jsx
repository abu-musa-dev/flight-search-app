const FlightCard = ({ flight }) => {
  const segment = flight.itineraries[0].segments[0];
  const stops = flight.itineraries[0].segments.length - 1;

  return (
    <div className="border p-4 rounded shadow mb-4">
      <p><strong>Airline:</strong> {segment.carrierCode}</p>
      <p><strong>From:</strong> {segment.departure.iataCode}</p>
      <p><strong>To:</strong> {segment.arrival.iataCode}</p>
      <p><strong>Stops:</strong> {stops}</p>
      <p><strong>Price:</strong> {flight.price.total} {flight.price.currency}</p>
    </div>
  );
};

export default FlightCard;
