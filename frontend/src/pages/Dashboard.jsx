import { useEffect, useState } from "react";
import API from "../utils/api";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

export default function Dashboard() {
  const { user, loadUser } = useAuth();
  const [name, setName] = useState("");

  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put("/me", { name });
       
      toast.success("Profile updated!");
    loadUser();
    } catch {
      toast.error("Update failed");
    }
  };

  if (!user) return <p className="p-10 text-center">Loading...</p>;

  return (
  <div className="p-6 max-w-xl mx-auto">
    <h2 className="text-2xl font-bold mb-6 text-indigo-600 text-center">
      My Profile
    </h2>

    <form
      onSubmit={handleUpdate}
      className="bg-white shadow-md rounded-lg p-6"
    >
      <label className="block mb-1 font-medium text-gray-700">Name</label>
      <input
        className="w-full border border-gray-300 rounded-md p-3 text-center focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        placeholder="Enter your name"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="block mt-4 mb-1 font-medium text-gray-700">
        Email (read-only)
      </label>
      <input
        className="w-full border border-gray-300 rounded-md p-3 text-center bg-gray-100"
        value={user?.email || ""}
        readOnly
      />

      <button
        className="w-full mt-6 bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition"
      >
        Save Changes
      </button>
    </form>
  </div>
);

}
