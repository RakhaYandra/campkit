import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRentals } from "../services/api";

const RentalDetail = () => {
  const { id } = useParams();
  const [rental, setRental] = useState(null);

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const response = await getRentals();
        const rentalData = response.data.data.find(
          (rental) => rental.id === parseInt(id)
        );
        setRental(rentalData);
      } catch (error) {
        console.error("Error fetching rental:", error);
      }
    };
    fetchRental();
  }, [id]);

  if (!rental) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Rental Detail</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">{rental.unitName}</h2>
            <p className="text-gray-600">
              {new Date(rental.rentalDate).toLocaleDateString()} -
              {rental.returnDate
                ? new Date(rental.maxReturnDate).toLocaleDateString()
                : "Ongoing"}
            </p>
          </div>
          <p className="text-lg font-bold text-blue-600">${rental.amount}</p>
        </div>
        <h3 className="text-lg font-semibold mb-2">Units</h3>
        <ul className="space-y-2">
          {rental.Units.map((unit) => (
            <li key={unit.id} className="bg-gray-100 p-2 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-md font-semibold">{unit.name}</h4>
                  <p className="text-gray-600">Code: {unit.code}</p>
                </div>
                <p className="text-md font-bold text-blue-600">${unit.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RentalDetail;
