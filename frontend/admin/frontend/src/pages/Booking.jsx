import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSuperAdminRentals } from "../services/api";

const Booking = () => {
  const [rentals, setRentals] = useState([]);
  const [filteredRentals, setFilteredRentals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rentalsPerPage = 5;

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await getSuperAdminRentals();
        setRentals(response.data.data);
        setFilteredRentals(response.data.data); // Initialize filteredRentals with all rentals
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };

    fetchRentals();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = rentals.filter((rental) =>
      rental.id.toString().includes(e.target.value)
    );
    setFilteredRentals(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  const handleClickPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination calculations
  const indexOfLastRental = currentPage * rentalsPerPage;
  const indexOfFirstRental = indexOfLastRental - rentalsPerPage;
  const currentRentals = filteredRentals.slice(
    indexOfFirstRental,
    indexOfLastRental
  );
  const totalPages = Math.ceil(filteredRentals.length / rentalsPerPage);

  return (
    <section className="ml-64 p-8 z-40 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search by Booking ID
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search by Booking ID"
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Booking ID
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Customer Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Start Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Max Return Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    End Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Returned
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Penalty
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRentals.map((rental) => (
                  <tr key={rental.id} className="border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {rental.id}
                    </th>
                    <td className="px-4 py-3">{rental.User.fullName}</td>
                    <td className="px-4 py-3">
                      {new Date(rental.rentalDate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(rental.maxReturnDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {rental.returnDate
                        ? new Date(rental.returnDate).toLocaleDateString(
                            "en-GB"
                          )
                        : "-"}
                    </td>
                    <td className="px-4 py-3 text-lg font-bold text-blue-600">
                      ${rental.amount}
                    </td>
                    <td className="px-4 py-3">
                      {rental.isReturned ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-3 text-lg font-bold text-blue-600">
                      {rental.Penalties.length > 0
                        ? `$${rental.Penalties[0].amount}`
                        : "-"}
                    </td>
                    <td className="px-4 py-3 flex items-center justify-end">
                      <Link
                        to={`/booking/${rental.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav
            className="flex justify-between items-center p-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing {indexOfFirstRental + 1}-
              {indexOfLastRental > filteredRentals.length
                ? filteredRentals.length
                : indexOfLastRental}{" "}
              of {filteredRentals.length}
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              {[...Array(totalPages).keys()].map((page) => (
                <li key={page}>
                  <button
                    onClick={() => handleClickPage(page + 1)}
                    className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                      currentPage === page + 1
                        ? "bg-primary-50 text-primary-600"
                        : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    } border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                  >
                    {page + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Booking;
