import useAuth from "../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar({query, setQuery}) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  const showSearch = location.pathname === "/tasks";
  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out");
    window.location.href = "/";
  };

  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">My Dashboard</h1>

      
      {/* Search bar only on /tasks */}
      <div className="flex-1 flex justify-center">
      {showSearch && (
        <input
          className="max-w-3xl px-4 py-2 rounded border border-white text-center placeholder:text-center text-sm"
          placeholder="Search tasks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}
        </div>
         

        {user === undefined ? null : (
        user && (
        <div className="flex gap-4 items-center text-white">
          <Link to="/dashboard" className="hover:underline cursor-pointer">Profile</Link>
          <Link to="/tasks" className="hover:underline cursor-pointer">Tasks</Link>
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded cursor-pointer">
            Logout
          </button>
        </div>
        )
      )}
    </nav>
  );
}
