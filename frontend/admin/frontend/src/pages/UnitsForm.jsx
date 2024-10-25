import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUnit, getCategories } from "../services/api";

const UnitsForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [newUnit, setNewUnit] = useState({
    name: "",
    price: 0.0,
    isAvailable: true,
    image: "",
    categories: [],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        console.log("categoriesss : ", response.data.data);
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleNewUnitChange = (e) => {
    const { id, value } = e.target;
    setNewUnit((prevUnit) => ({
      ...prevUnit,
      [id]: value,
    }));
  };

  const handleNewUnitCheckboxChange = (categoryId) => {
    setNewUnit((prevUnit) => {
      const newCategories = prevUnit.categories.includes(categoryId)
        ? prevUnit.categories.filter((id) => id !== categoryId)
        : [...prevUnit.categories, categoryId];
      return { ...prevUnit, categories: newCategories };
    });
  };

  const handleNewUnitSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUnit(newUnit);
      alert("Unit created successfully");
      navigate("/units");
    } catch (error) {
      console.error("Error creating unit:", error);
    }
  };

  return (
    <div className="ml-64 p-8 z-40 max-w-2xl mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 mt-8">
        Create New Unit
      </h3>
      <form onSubmit={handleNewUnitSubmit}>
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Unit Name
            </label>
            <input
              type="text"
              id="name"
              value={newUnit.name}
              onChange={handleNewUnitChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              value={newUnit.price}
              onChange={handleNewUnitChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="isAvailable"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Available
            </label>
            <select
              id="isAvailable"
              value={newUnit.isAvailable}
              onChange={handleNewUnitChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Image
            </label>
            <input
              type="text"
              id="image"
              value={newUnit.image}
              onChange={handleNewUnitChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Categories
            </label>
            {categories.map((category) => (
              <div key={category.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  checked={newUnit.categories.includes(category.id)}
                  onChange={() => handleNewUnitCheckboxChange(category.id)}
                  className="mr-2"
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="text-sm font-medium text-gray-900 dark:text-white"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
        >
          Create Unit
        </button>
      </form>
    </div>
  );
};

export default UnitsForm;
