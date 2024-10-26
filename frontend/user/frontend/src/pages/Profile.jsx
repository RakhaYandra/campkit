import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../services/api";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
} from "react-icons/fa";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getProfile();
      setProfile(response.data);
      setFormData(response.data);
      console.log ("Profile data: ", response.data);
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, phoneNumber, address, image } = formData;
    try {
      await updateProfile({ fullName, email, phoneNumber, address, image });
      setIsEditing(false);
      loadProfile();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-8 text-center text-blue-600">
        Profile
      </h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.fullName || ""}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.phoneNumber || ""}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.address || ""}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Image URL
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.image || ""}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <img
              src={
                profile.data.image &&
                profile.data.image.startsWith("data:image")
                  ? profile.data.image
                  : "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4 shadow-lg transition-transform duration-200 transform hover:scale-105"
            />
          </div>
          <div className="w-full bg-gray-50 p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <FaUser className="text-blue-500 mr-3" />
              <p className="text-lg font-medium">
                Full Name: {profile.data.fullName}
              </p>
            </div>
            <hr />
            <div className="flex items-center my-4">
              <FaEnvelope className="text-blue-500 mr-3" />
              <p className="text-lg font-medium">Email: {profile.data.email}</p>
            </div>
            <hr />
            <div className="flex items-center my-4">
              <FaPhone className="text-blue-500 mr-3" />
              <p className="text-lg font-medium">
                Phone: {profile.data.phoneNumber}
              </p>
            </div>
            <hr />
            <div className="flex items-center mt-4">
              <FaMapMarkerAlt className="text-blue-500 mr-3" />
              <p className="text-lg font-medium">
                Address: {profile.data.address}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition duration-300"
          >
            <FaEdit className="mr-2" /> Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
