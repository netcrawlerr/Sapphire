import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";
import Layout from "./pages/Layout";
import Error from "./pages/Error";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Admin from "./pages/Admin/Admin";
import Products from "./pages/Admin/Products";
import Orders from "./pages/Admin/Orders";
import Users from "./pages/Admin/Users";
import AddToCart from "./pages/AddToCart";
import { CartProvider } from "./utils/useCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },

      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "users",
            element: <Users />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
};

export default App;
