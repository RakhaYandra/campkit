import { useState, useEffect } from "react";
import { getSuperAdminProfile, updateSuperAdminProfile } from "../services/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getSuperAdminProfile();
      setProfile(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, image } = formData;
    try {
      await updateProfile({ fullName, email, image });
      setIsEditing(false);
      loadProfile();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>
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
        <div className="flex flex-col items-center">
          <img
            src={
              "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4 shadow-lg"
          />
          <p className="mb-4 text-lg font-medium">
            Full Name: {profile.data.fullName}
          </p>
          <p className="mb-4 text-lg font-medium">
            Email: {profile.data.email}
          </p>

          {/* <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Edit Profile
          </button> */}
        </div>
      )}
    </div>
  );
};

export default Profile;
