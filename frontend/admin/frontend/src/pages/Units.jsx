import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUnits, deleteUnit } from "../services/api";

const Units = () => {
  const [units, setUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [unitsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unitToDelete, setUnitToDelete] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await getUnits();
        setUnits(response.data.data);
        setFilteredUnits(response.data.data);
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    };

    fetchUnits();
  }, []);

  // Handle search by ID
  const handleSearch = (event) => {
    const id = event.target.value;
    setSearchId(id);
    if (id === "") {
      setFilteredUnits(units);
    } else {
      const filtered = units.filter((unit) => unit.id.toString().includes(id));
      setFilteredUnits(filtered);
    }
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Handle sorting by ID
  const handleSort = () => {
    const sortedUnits = [...filteredUnits].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setFilteredUnits(sortedUnits);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Pagination logic
  const indexOfLastUnit = currentPage * unitsPerPage;
  const indexOfFirstUnit = indexOfLastUnit - unitsPerPage;
  const currentUnits = filteredUnits.slice(indexOfFirstUnit, indexOfLastUnit);
  const totalPages = Math.ceil(filteredUnits.length / unitsPerPage);

  const openModal = (id) => {
    setUnitToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setUnitToDelete(null);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteUnit(unitToDelete);
      setUnits(units.filter((unit) => unit.id !== unitToDelete));
      setFilteredUnits(
        filteredUnits.filter((unit) => unit.id !== unitToDelete)
      );
      closeModal();
    } catch (error) {
      console.error("Error deleting unit:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="ml-64 p-8 z-40 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
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
                    value={searchId}
                    onChange={handleSearch}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search by ID"
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-1/2 flex justify-end">
              <button
                onClick={handleSort}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 mr-2"
              >
                Sort by ID ({sortOrder === "asc" ? "ASC" : "DESC"})
              </button>
              <button
                onClick={() => navigate("/units/create")}
                className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
              >
                Create Unit
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Code
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUnits.map((unit, i) => (
                  <tr key={i} className="border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {unit.id}
                    </th>
                    <td className="px-4 py-3">{unit.name}</td>
                    <td className="px-4 py-3">{unit.code}</td>
                    <td className="px-4 py-3 text-lg font-bold text-blue-600">
                      ${unit.price}
                    </td>
                    <td className="px-4 py-3">
                      {unit.Categories.map((category, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
                        >
                          {category.name}
                        </span>
                      ))}
                    </td>
                    <td className="px-4 py-3 flex items-center justify-end space-x-2">
                      <Link
                        to={`/units/detail/${unit.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => openModal(unit.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav
            className="flex flex-col md:flex-row justify-between items-start md:items-center p-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {indexOfFirstUnit + 1} -{" "}
                {indexOfLastUnit > filteredUnits.length
                  ? filteredUnits.length
                  : indexOfLastUnit}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {filteredUnits.length}
              </span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i}>
                  <button
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-2 leading-tight ${
                      currentPage === i + 1
                        ? "text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-blue-500"
                        : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this unit?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Units;
