import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useStore from "../utils/zus";

const NavBar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get("/api/user/getUserData");
        const data = await response.data;
        if (data) {
          setIsLoggedIn(true);
          console.log(data.user);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    getUserData();
  }, [setIsLoggedIn]);

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/auth/logout");
      const data = await response.data;
      if (data) {
        setIsLoggedIn(false);
        console.log(data);
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center px-8 py-4 lg:py-6">
        <img src="/logo.png" className="w-[200px]" alt="Logo" />

        {/* Desktop nav */}
        <div className="hidden lg:flex gap-8 text-xl">
          {isLoggedIn && (
            <Link to="/" onClick={handleLogout} className="hover:text-gray-700">
              Logout
            </Link>
          )}

          {!isLoggedIn && (
            <Link to="/login" className="hover:text-gray-700">
              Login
            </Link>
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
          <Link to="/login" className="text-white hover:text-gray-400">
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
