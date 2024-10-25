import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateCategory, getCategoryById } from "../services/api";

const CategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    id: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategoryById(id);
        setCategory(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCategory(id, category);
      navigate(-1);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className="ml-64 p-8 z-40 max-w-2xl mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Category Details - {category.id}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={category.name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={category.description}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          Update Category
        </button>
      </form>
    </div>
  );
};

export default CategoryDetail;