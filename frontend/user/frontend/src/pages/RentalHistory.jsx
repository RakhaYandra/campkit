import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRentals } from "../services/api";

const RentalHistory = () => {
  const [rentals, setRentals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const rentalsPerPage = 5;

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await getRentals();
        setRentals(response.data.data);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };
    fetchRentals();
  }, []);

  // Filtered rentals based on the search term (if searching by sequence number)
  const filteredRentals = rentals.filter((_, index) => {
    const sequentialNumber = index + 1;
    return sequentialNumber.toString().includes(searchTerm);
  });

  // Calculate pagination based on filtered results
  const indexOfLastRental = currentPage * rentalsPerPage;
  const indexOfFirstRental = indexOfLastRental - rentalsPerPage;
  const currentRentals = filteredRentals.slice(
    indexOfFirstRental,
    indexOfLastRental
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search by No."
                    required=""
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
                    No
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Start Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Return Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRentals.map((rental, index) => (
                  <tr key={index} className="border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {indexOfFirstRental + index + 1}
                    </th>
                    <td className="px-4 py-3">
                      {new Date(rental.rentalDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {rental.maxReturnDate
                        ? new Date(rental.maxReturnDate).toLocaleDateString()
                        : "Null"}
                    </td>
                    <td className="px-4 py-3 text-lg font-bold text-blue-600">
                      ${rental.amount}
                    </td>
                    <td className="px-4 py-3 flex items-center justify-end">
                      <Link
                        to={`/rental/${rental.id}`}
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
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span className="font-semibold text-gray-900 dark:text-white">
                {indexOfFirstRental + 1}-
                {Math.min(indexOfLastRental, filteredRentals.length)}
              </span>
              of
              <span className="font-semibold text-gray-900 dark:text-white">
                {filteredRentals.length}
              </span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              {Array.from(
                { length: Math.ceil(filteredRentals.length / rentalsPerPage) },
                (_, i) => (
                  <li key={i}>
                    <button
                      onClick={() => paginate(i + 1)}
                      className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                        currentPage === i + 1
                          ? "bg-primary-50 text-primary-600"
                          : "bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                      } border border-gray-300 dark:border-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white`}
                    >
                      {i + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default RentalHistory;
