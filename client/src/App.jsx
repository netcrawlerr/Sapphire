import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";
import Layout from "./pages/Layout";
import Error from "./pages/Error";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import CheckoutReport from "./pages/CheckoutReport";
import Admin from "./pages/Admin/Admin";
import Products from "./pages/Admin/Products";
import Orders from "./pages/Admin/Orders";
import Users from "./pages/Admin/Users";
import AddToCart from "./pages/AddToCart";
import { CartProvider } from "./utils/useCart";
import ProtectedRoute from "./utils/ProtectedRoute"; // Import the ProtectedRoute

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
        path: "shop",
        element: <ProtectedRoute element={Shop} />, // Pass the component directly
      },
      {
        path: "addtocart",
        element: <ProtectedRoute element={AddToCart} />, // Pass the component directly
      },
      {
        path: "cart",
        element: <ProtectedRoute element={Cart} />, // Pass the component directly
      },
      {
        path: "checkoutReport",
        element: <ProtectedRoute element={CheckoutReport} />, // Pass the component directly
      },
      {
        path: "admin",
        element: <ProtectedRoute element={Admin} />, // Pass the component directly
        children: [
          {
            path: "products",
            element: <ProtectedRoute element={Products} />, // Pass the component directly
          },
          {
            path: "orders",
            element: <ProtectedRoute element={Orders} />, // Pass the component directly
          },
          {
            path: "users",
            element: <ProtectedRoute element={Users} />, // Pass the component directly
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
