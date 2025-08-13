import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">
      <Link to="/" className="text-xl font-bold text-blue-400">
        Book Manager
      </Link>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/books">Books</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
