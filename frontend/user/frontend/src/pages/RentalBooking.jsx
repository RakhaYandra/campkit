import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createRental } from "../services/api";

const RentalBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productId = location.state?.productId;

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createRental({
        units: [productId], // Send productId as part of an array for units
        startDate: formData.startDate,
        endDate: formData.endDate,
      });
      navigate(`/rental/${response.data.id}`);
    } catch (error) {
      console.error("Error creating rental:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Book Rental</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default RentalBooking;
