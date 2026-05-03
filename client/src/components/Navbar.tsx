import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => setShowLogoutModal(true);
  const cancelLogout = () => setShowLogoutModal(false);
  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showLogoutModal && e.key === "Enter") {
        confirmLogout();
      }
    };

    if (showLogoutModal) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showLogoutModal]);

  return (
    <header className="bg-white shadow-sm relative z-40">
      <nav className="flex items-center justify-between py-4 px-4 max-w-7xl mx-auto">
        <div className="flex items-center">
          <span className="text-xl">🌍</span>
          <Link
            to="/"
            className="ml-1 text-black text-2xl font-semibold italic no-underline"
          >
            Travel Journal.
          </Link>
        </div>

        <div className="flex items-center gap-4">
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
                onClick={handleLogoutClick}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors text-sm font-medium shadow-sm active:scale-95"
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
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
            onClick={cancelLogout}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm transform transition-all scale-100 opacity-100 border border-gray-100">
            <div className="flex flex-col items-center text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Leaving so soon?
              </h3>
              <p className="text-gray-500 text-sm">
                Are you sure you want to log out? You'll need to sign back in to
                add new memories.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={confirmLogout}
                className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all shadow-lg shadow-red-200 active:scale-[0.98]"
              >
                Yes, Sign Out
              </button>
              <button
                onClick={cancelLogout}
                className="w-full py-3 bg-gray-50 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-all active:scale-[0.98]"
              >
                Stay Logged In
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
