import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", {
        email: email,
        password: password,
      });
      const data = await response.data;
      navigate("/shop");
      console.log(data);
    } catch (error) {
      setLoginError(error.response.data)
      console.log("error loging in");
    }
  };
  return (
    <div className="flex flex-row justify-center h-screen ">
      <div className="">
        <div className="flex  items-center mt-40 "></div>
        <form
          onSubmit={handleLogin}
          method="post"
          action=""
          className="flex flex-col w-[400px]  p-5 border-black   "
        >
          <div className="text-5xl text-yellow-600 mb-5 text-center">
            Sapphire
          </div>
          <h1 className={loginError ? "text- py-2 text-red-500 text-lg" : "hidden text- py-2 text-red-500 text-lg" }>Invalid Credentials</h1>
          {/* <label htmlFor="email">Email</label> */}
          <input
            className="border mb-5 p-1 outline-none shadow  px-3"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <label htmlFor="password">Password</label> */}
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
            className="bg-yellow-500  border mt-5 rounded-sm w-100 p-1  "
            type="submit "
          >
            Login
          </button>
          <p className="flex gap-2 text-sm mt-3">
            Don`t Have An Account ?
            <Link to="/register" className="text-blue-600 font-bold ">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
