import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../services/api";

const CategoryForm = () => {
  const navigate = useNavigate();
  const [newCategory, setNewCategory] = useState({
    id: "",
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory(newCategory);
      alert("Category created successfully");
      navigate("/category");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div className="ml-64 p-8 z-40 max-w-2xl mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 mt-8">
        Create New Category
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newCategory.name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={newCategory.description}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
        >
          Create Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;