import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSuperAdminRentals, updateRental } from "../services/api";

const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [isReturned, setIsReturned] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await getSuperAdminRentals();
        const bookingData = response.data.data.find(
          (booking) => booking.id === parseInt(id)
        );
        setBooking(bookingData);
        setIsReturned(bookingData.isReturned);
      } catch (error) {
        console.error("Error fetching booking:", error);
      }
    };
    fetchBooking();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRental(id, { isReturned });
      alert("Booking updated successfully");
      navigate("/booking");
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  if (!booking) return <div>Loading...</div>;

  return (
    <div className="ml-64 p-8 z-40 max-w-2xl mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Booking Details
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="customerName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Customer Name
            </label>
            <input
              type="text"
              id="customerName"
              value={booking.User.fullName}
              disabled
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="startDate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Start Date
            </label>
            <input
              type="text"
              id="startDate"
              value={new Date(booking.rentalDate).toLocaleDateString("en-GB")}
              disabled
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="maxReturnDate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Max Return Date
            </label>
            <input
              type="text"
              id="maxReturnDate"
              value={new Date(booking.maxReturnDate).toLocaleDateString("en-GB")}
              disabled
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              End Date
            </label>
            <input
              type="text"
              id="endDate"
              value={
                booking.returnDate
                  ? new Date(booking.returnDate).toLocaleDateString("en-GB")
                  : "-"
              }
              disabled
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="amount"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Amount
            </label>
            <input
              type="text"
              id="amount"
              value={`$${booking.amount}`}
              disabled
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="isReturned"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Is Returned
            </label>
            <select
              id="isReturned"
              value={isReturned}
              onChange={(e) => setIsReturned(e.target.value === "true")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          Update Booking
        </button>
      </form>
    </div>
  );
};

export default BookingDetail;