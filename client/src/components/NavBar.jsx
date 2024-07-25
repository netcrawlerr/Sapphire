import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center px-8 py-4 lg:py-6">
        <img src="/logo.png" className="w-[220px]" alt="Logo" />

        {/* my desktop nav */}
        <div className="hidden lg:flex gap-8 text-xl">
          <Link to="/shop" className="hover:text-gray-700">
            Browse
          </Link>
          <Link to="/register" className="hover:text-gray-700">
            Register
          </Link>
          <Link to="" className="hover:text-gray-700">
            About
          </Link>
        </div>

        <button
          className="lg:hidden p-4 text-gray-700 hover:text-gray-900"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* mine >>> Visible on small screens) */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-gray-800 text-white transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-gray-300 mb-6"
          onClick={() => setSidebarOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col p-6 space-y-4">
          <Link to="/shop" className="text-white hover:text-gray-400">
            Browse
          </Link>
          <Link to="/register" className="text-white hover:text-gray-400">
            Register
          </Link>
          <Link to="" className="text-white hover:text-gray-400">
            About
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
