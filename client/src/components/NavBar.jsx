import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center px-8 py-4 lg:py-6">
        <img src="/logo.png" className="w-[200px]" alt="Logo" />

        {/* Desktop nav */}
        <div className="hidden lg:flex gap-8 text-xl">
          <Link to="/shop" className="hover:text-gray-900 hover:border-black">
            Browse
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="hover:text-gray-700">
                Profile
              </Link>
              <button onClick={handleLogout} className="hover:text-gray-700">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-700">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-700">
                Register
              </Link>
            </>
          )}
          <Link to="/about" className="hover:text-gray-700">
            About
          </Link>
        </div>

        {/* Mobile menu button */}
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

      {/* Sidebar for mobile */}
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
<<<<<<< HEAD
          <Link to="/shop" className="text-white hover:text-gray-400 hover:border-black">
=======
          <Link to="/login" className="text-white hover:text-gray-400">
>>>>>>> 7af1ad55f7a3423806c8d4cf2a74f1aca6501943
            Browse
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="text-white hover:text-gray-400">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-400">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-gray-400">
                Register
              </Link>
            </>
          )}
          <Link to="/about" className="text-white hover:text-gray-400">
            About
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
