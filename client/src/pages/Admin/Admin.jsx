import { Outlet, Link } from "react-router-dom";
import { FaAccusoft, FaBoxesPacking } from "react-icons/fa6";
import { MdReceiptLong } from "react-icons/md";
import { PiUserFocus } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";

const Admin = () => {
  return (
    <div className="flex">
      {/* <NavBar /> */}

      <div
        id="sidebar"
        className="bg-f-700 flex-col w-[210px] h-screen px-2 border border-t-0 border-r-yellow-500 mt-7 "
      >
        <div className="sidebar-header">
          <h3 className="text-4xl text-yellow-600">SAPPHIRE</h3>
        </div>
        <div className="container mt-10">
          <div>
            <ul>
              <Link
                to="/admin/products"
                className="flex items-center justify-between mb-6 hover:bg-purple-700 bg-purple-600 text-white p-2 rounded-lg hover:scale-105 transition-all cursor-pointer"
              >
                <span className="mx-2">Products</span>
                <FaBoxesPacking />
              </Link>
            </ul>
          </div>

          <div>
            <ul>
              <Link
                to="/admin/orders"
                className="flex items-center justify-between mb-6 hover:bg-purple-700 bg-purple-600 text-white p-2 rounded-lg hover:scale-105 transition-all cursor-pointer"
              >
                <span className="mx-2">Orders</span>
                <MdReceiptLong />
              </Link>
            </ul>
          </div>

          <div>
            <ul>
              <Link
                to="/admin/users"
                className="flex items-center justify-between mb-6 hover:bg-purple-700 bg-purple-600 text-white p-2 rounded-lg hover:scale-105 transition-all cursor-pointer"
              >
                <span className="mx-2">Users</span>
                <PiUserFocus />
              </Link>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-5 w-full  ">
        <div className="flex justify-between px-5 items-center">
          <div>
            <h1 className=" text-4xl text-purple-700 font-bold mb-5  w-full">
              Admin Dashboard
            </h1>
          </div>
          <h1 className="text-3xl hover:cursor-pointer">
            <FaRegUserCircle />
          </h1>
        </div>
        <div>
          <h1 className="px-5">Welcome back Admin 👋</h1>
        </div>
        {/* <div className="w-[100px] h-[100px] bg-red-800 rounded-3xl"></div> */}
        <div className="p-10">
          {/* outletsection */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
