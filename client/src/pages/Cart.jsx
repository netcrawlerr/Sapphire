import { useEffect, useState } from "react";
import { CgRemove } from "react-icons/cg";
import { FaShoppingBasket } from "react-icons/fa";
import axios from "axios";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      const response = await axios.post("api/products/getCartItems");
      const data = response.data.cart;

      setCartData(data);

      // Initialize quantities with the default value for each cart item
      const initialQuantities = data.reduce((acc, item) => {
        acc[item._id] = item.quantity || 1;
        return acc;
      }, {});
      setQuantities(initialQuantities);

      console.log("cart is", data);
    };
    fetchCartData();
  }, []);

  useEffect(() => {
    // Calculate total whenever cartData or quantities change
    const newTotal = cartData.reduce((sum, item) => {
      return sum + item.price * (quantities[item._id] || item.quantity);
    }, 0);

    setTotal(newTotal);
  }, [cartData, quantities]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await axios.post("api/products/updateCartItemQuantity", {
        itemId,
        quantity: newQuantity,
      });

      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: newQuantity,
      }));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const confirmRemove = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (!confirmRemove) {
        return;
      }

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

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-slate-900 text-white text-3xl font-bold p-5">
        <h1 className="flex justify-center items-center gap-x-4">
          Your Shopping Cart <FaShoppingBasket />
        </h1>
      </div>
      <div className="flex-grow p-7 flex-col max-h-[450px] overflow-y-scroll justify-center items-center">
        <table className="w-full flex border-collapse md:table">
          <tbody className="flex flex-wrap md:table-row-group">
            {cartData.map((cartItem) => (
              <tr
                key={cartItem._id}
                className="bg-white border border-t-black   block md:table-row"
              >
                <td className="p-2 px-3 block md:table-cell">
                  <div className="flex gap-2 items-center">
                    <img
                      src={cartItem.photo}
                      className="w-[100px] h-[100px] rounded-full"
                      alt=""
                    />
                    <h1>{cartItem.name}</h1>
                  </div>
                </td>
                <td className="p-2 px-3 block md:table-cell">
                  {cartItem.price} Birr
                </td>
                <td className="p-2 px-3 block md:table-cell">
                  <input
                    value={quantities[cartItem._id] || 1}
                    onChange={(e) =>
                      handleQuantityChange(cartItem._id, Number(e.target.value))
                    }
                    type="number"
                    className="border border-blue-800 w-20 text-center p-1 rounded-lg"
                  />
                </td>
                <td className="p-2 px-3 block md:table-cell">
                  <button onClick={() => handleRemoveItem(cartItem._id)}>
                    <CgRemove className="ml-5 text-2xl text-red-600 hover:text-red-800 transition-colors duration-300" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex  justify-between bg-stone-900 p-20">
        <div className="text-white flex justify-center items-start m-auto gap-5 text-xl font-bold">
          Total: {total.toFixed(2)} Birr
          <button className="bg-yellow-600 text-white font-bold py-2 px-4 rounded-sm hover:bg-yellow-700 transition-colors duration-300">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
