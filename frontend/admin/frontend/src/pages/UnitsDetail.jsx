import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUnitById, getCategories, updateUnit } from "../services/api";

const UnitDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [unit, setUnit] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategoriesFix, setSelectedCategoriesFix] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const unitResponse = await getUnitById(id);
        const categoriesResponse = await getCategories();

        const unitData = unitResponse.data.data;
        const categoriesData = categoriesResponse.data.data;

        // Mark categories that are present in the unit as selected
        const updatedCategories = categoriesData.map((category) => ({
          ...category,
          selected: unitData.Categories.some(
            (unitCategory) => unitCategory.name === category.name
          ),
        }));

        const selectedCategories = updatedCategories
          .filter((category) => category.selected)
          .map((category) => ({ name: category.name }));

        setUnit(unitData);
        setCategories(updatedCategories);
        setSelectedCategoriesFix(selectedCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUnit((prevUnit) => ({
      ...prevUnit,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (index) => {
    console.log(`Checkbox at index ${index} changed`, selectedCategoriesFix);
    const updatedCategories = categories.map((category, catIndex) =>
      catIndex === index
        ? { ...category, selected: !category.selected }
        : category
    );
    setCategories(updatedCategories);

    const updatedSelectedCategoriesFix = updatedCategories
      .filter((category) => category.selected)
      .map((category) => ({ name: category.name }));
    setSelectedCategoriesFix(updatedSelectedCategoriesFix);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the unit with the selected categories
      await updateUnit(id, { ...unit, Categories: selectedCategoriesFix });
      alert("Unit updated successfully");
      navigate("/units");
    } catch (error) {
      console.error("Error updating unit:", error);
    }
  };

  if (!unit) return <div>Loading...</div>;

  return (
    <div className="ml-64 p-8 z-40 max-w-2xl mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Unit Details
      </h3>
      <form onSubmit={handleSubmit}>
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
              value={unit.name}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="code"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Unit Code
            </label>
            <input
              type="text"
              id="code"
              value={unit.code}
              onChange={handleInputChange}
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
              type="text"
              id="price"
              value={unit.price}
              onChange={handleInputChange}
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
              value={unit.isAvailable}
              onChange={handleInputChange}
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
              value={unit.image}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          Update Unit
        </button>
      </form>
    </div>
  );
};

export default UnitDetail;
