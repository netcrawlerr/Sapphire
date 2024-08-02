import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await axios.post("/api/auth/login", {
      email: email,
      password: password,
    });
    const data = await response.data;
    console.log(data);
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
          {/* <label htmlFor="email">Email</label> */}
          <input
            className="border mb-5 p-1 outline-none shadow  px-3"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
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
