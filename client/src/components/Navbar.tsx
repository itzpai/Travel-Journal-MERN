import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <nav className="flex items-center justify-between py-4 px-4 max-w-7xl mx-auto">
        <div className="flex items-center">
          <span className="text-xl">🌍</span>
          <Link
            to="/"
            className="ml-1 text-black font-semibold text-lg no-underline"
          >
            Travel Journal.
          </Link>
        </div>
        {user && (
          <Link
            to="/create"
            className="flex items-center gap-1 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            <span>+</span>
            <span>Create Entry</span>
          </Link>
        )}
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">
              {user.username}
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors text-sm font-medium"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
