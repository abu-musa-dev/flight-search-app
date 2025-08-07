const FlightCard = ({ flight }) => {
  const offer = flight.offerItems?.[0];
  const price = flight.price?.total;
  const airline = flight.validatingAirlineCodes?.[0];

  return (
    <div className="border p-4 rounded shadow mb-4">
      <p><strong>Airline:</strong> {airline}</p>
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Stops:</strong> {flight.itineraries?.[0]?.segments?.length - 1}</p>
    </div>
  );
};

export default FlightCard;
