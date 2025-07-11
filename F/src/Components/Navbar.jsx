import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-blue-700 tracking-tight">
              WealthMate
            </span>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-700 font-medium transition"
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="text-gray-700 hover:text-blue-700 font-medium transition"
            >
              Profile
            </Link>
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-700 font-medium transition"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-700 hover:text-blue-700 font-medium transition"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <span className="text-blue-700 font-semibold mr-2">
                  {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-medium"
                >
                  Log Out
                </button>
              </>
            )}
          </div>
          {/* Mobile menu button (optional, for future expansion) */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
