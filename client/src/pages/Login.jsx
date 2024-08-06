import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../components/Loader"; // Import the Loader component

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(true); // Initially set to true
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", {
        email: email,
        password: password,
      });
      const data = await response.data;
      navigate("/shop");
      console.log(data);
    } catch (error) {
      setLoginError("Invalid credentials, please try again.");
      console.log("Error logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {loading && <Loader />} {/* Show loader when loading */}
      <div className="flex flex-row justify-center h-screen ">
        <div className="">
          <div className="flex items-center mt-40 "></div>
          <form
            onSubmit={handleLogin}
            method="post"
            action=""
            className="flex flex-col w-[400px] p-5 border-black"
          >
            <div className="text-5xl text-yellow-600 mb-5 text-center">
              Sapphire
            </div>
            <h1
              className={
                loginError
                  ? "py-2 text-red-500 text-lg"
                  : "hidden py-2 text-red-500 text-lg"
              }
            >
              {loginError}
            </h1>
            <input
              className="border mb-5 p-1 outline-none shadow px-3"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border mb-5 p-1 outline-none shadow px-3"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-yellow-500 border mt-5 rounded-sm w-100 p-1"
              type="submit"
            >
              Login
            </button>
            <p className="flex gap-2 text-sm mt-3">
              Don’t Have An Account?
              <Link to="/register" className="text-blue-600 font-bold">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
