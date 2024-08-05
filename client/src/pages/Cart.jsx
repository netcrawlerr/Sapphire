import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgRemove } from "react-icons/cg";
import { FaShoppingBasket, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
const Cart = () => {
  // State variables
  const [cartData, setCartData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch initial cart data
    const fetchCartData = async () => {
      try {
        const response = await axios.post("api/products/getCartItems");
        const data = response.data.cart;

        setCartData(data);

        //  ... default value for each cart item
        const initialQuantities = data.reduce((acc, item) => {
          acc[item._id] = item.quantity || 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      } catch (error) {
        toast.error(`Only ${data[0].quantity} items found in Stock.`);
      }
    };
    fetchCartData();
  }, []);

  useEffect(() => {
    // new totoal when cart changes
    const newTotal = cartData.reduce((sum, item) => {
      return sum + item.price * (quantities[item._id] || item.quantity);
    }, 0);

    setTotal(newTotal);
  }, [cartData, quantities]);

  //  quantity change
  const handleQuantityChange = async (itemId, newQuantity) => {
    // console.log("cartData before update quantity in handkeQuantity change", cartData);
    // console.log("item variable in handkeQuantity change", item);

    // Check if the new quantity exceeds the available stock

    try {
      await axios.post("api/products/updateCartItemQuantity", {
        itemId,
        quantity: newQuantity,
      });

      // getUpdatedCartData();
      console.log(cartData);

      const item = cartData.find((cartItem) => cartItem._id === itemId);

      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: newQuantity,
      }));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //  removal
  const handleRemoveItem = async (itemId) => {
    try {
      const confirmRemove = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (!confirmRemove) return;

      setCartData((prevCartData) =>
        prevCartData.filter((item) => item._id !== itemId)
      );
      setQuantities((prevQuantities) => {
        const { [itemId]: _, ...rest } = prevQuantities;
        return rest;
      });

      await axios.post("api/products/removeCartItem", { itemId });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // updated cart data
  const getUpdatedCartData = () => {
    return cartData.map((item) => ({
      ...item,
      quantity: quantities[item._id] || item.quantity,
    }));
  };

  //  checkout
  const handleCheckout = async (e) => {
    e.preventDefault();

    // console.log(isSubmitting);

    const updatedCartData = getUpdatedCartData(); // Get updated cart data
    console.log("Just Before checkout  updated:", updatedCartData[0].quantity);

    try {
      const response = await axios.post("api/products/checkout", {
        cartData: updatedCartData,
        total,
      });

      // navigate("/checkoutReport");
      navigate("/checkoutReport", { state: response.data });
      console.log("Checkout response:", response.data);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      <div className="bg-slate-900 flex justify-between text-white text-3xl font-bold p-5">
        <Link to="/shop" className="flex text-lg items-center gap-4">
          <FaArrowLeft /> <span>Back To Shop</span>
        </Link>
        <h1 className="flex justify-center items-center text-center gap-x-4">
          Your Shopping Cart <FaShoppingBasket />
        </h1>
        <h1 className="placeholder"></h1>
      </div>
      <div className="flex-grow p-4 flex flex-col lg:flex-row gap-4">
        {cartData.length === 0 ? (
          <div className="flex flex-col justify-center items-center w-full h-full p-5">
            <h1 className="text-3xl text-red-800 font-light text-center mb-4">
              Cart is Empty
            </h1>
            <Link to="/shop">
              <button className="bg-slate-500 text-white font-bold py-2 px-4 rounded hover:bg-slate-700 transition-colors duration-300">
                Add Some
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-products flex-grow bg-white p-4 overflow-y-auto max-h-[400px] lg:max-h-[450px] rounded-md shadow-md">
              <table className="w-full border-collapse">
                <tbody>
                  {cartData.map((cartItem) => (
                    <tr key={cartItem._id} className="border border-t-black">
                      <td className="p-2 px-3">
                        <div className="flex gap-2 items-center">
                          <img
                            src={cartItem.photo}
                            className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] lg:w-[100px] lg:h-[100px] rounded-full object-cover"
                            alt={cartItem.name}
                          />
                          <h1 className="text-sm sm:text-base lg:text-lg">
                            {cartItem.name}
                          </h1>
                        </div>
                      </td>
                      <td className="p-2 px-3 text-sm sm:text-base lg:text-lg">
                        {cartItem.price} Birr
                      </td>
                      <td className="p-2 px-3">
                        <input
                          required
                          value={quantities[cartItem._id] || 1}
                          onChange={(e) =>
                            handleQuantityChange(
                              cartItem._id,
                              Number(e.target.value)
                            )
                          }
                          type="number"
                          className="border border-blue-800 w-16 text-center p-1 rounded-lg"
                          style={{ maxWidth: "100%" }}
                        />
                      </td>
                      <td className="p-2 px-3">
                        <button onClick={() => handleRemoveItem(cartItem._id)}>
                          <CgRemove className="text-xl sm:text-2xl text-red-600 hover:text-red-800 transition-colors duration-300" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="cart-checkout bg-stone-900 p-5 flex flex-col gap-4 w-full lg:w-[300px] rounded-md shadow-md">
              <div className="text-white flex flex-col gap-4">
                <h1>Pay With</h1>
                <div>
                  <img
                    width={40}
                    src="https://dev.ethiotelecom.et/wp-content/uploads/2021/06/telebirr_Web-03-400x398.png"
                    alt="Payment Logo"
                  />
                  <form
                    action=""
                    onSubmit={handleCheckout}
                    className="flex flex-col py-5 my-5 gap-y-4"
                  >
                    <div>
                      <label htmlFor="companyId">Company ID</label>
                      <input
                        className="rounded bg-slate-300 text-black px-2 py-2 w-full"
                        type="text"
                        value="1-800-414-4444 "
                        // might haev to remove readonly
                        readOnly
                        name="companyId"
                        id="companyId"
                      />
                    </div>
                    <div>
                      <label htmlFor="phoneNumber">Your Phone Number</label>
                      <input
                        className="rounded bg-slate-300 text-black px-2 py-2 w-full"
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                      />
                    </div>
                    <h2 className="text-xl font-bold">
                      Total: {total.toFixed(2)} Birr
                    </h2>
                    <button
                      type="submit"
                      className="bg-yellow-600 text-white font-bold py-2 px-4 rounded-sm hover:bg-yellow-700 transition-colors duration-300"
                      style={{ width: "100%" }}
                    >
                      Checkout
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
