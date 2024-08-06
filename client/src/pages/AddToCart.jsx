import { Link } from "react-router-dom";
import { ArrowLeftCircle, ShoppingBasketIcon } from "lucide-react";
import { useCart } from "../utils/useCart";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import Loader from "../components/Loader";  

const AddToCart = () => {
  const { singleItem } = useCart();
  const [loading, setLoading] = useState(false);  
  const isSoldOut = singleItem.status === "soldout";

  const handleAddToCart = async () => {
    if (isSoldOut) {
      toast.error("Sorry, this item is sold out.");
      return;
    }

    setLoading(true); 
    try {
      const response = await axios.post("api/products/addToCart", {
        singleItem: singleItem,
      });
      console.log("sending To Backend");
      const data = response.data;
      console.log("data sent is ", data);
      console.log("After Adding to Cart", data);

      toast.success("Added To Cart");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add to cart. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="relative">
      {loading && <Loader />} {/* Show loader when loading */}
      <div className="p-20">
        <h1 className="text-3xl">Add To Cart </h1>

        <Link to="/shop">
          <ArrowLeftCircle className="text-4xl" /> <span>Back to shop</span>
        </Link>

        <div className="product-description flex justify-center flex-wrap w-full gap-x-5 gap-y-5 p-2">
          {/* START Product with image and name */}
          <div className="flex-col text-center w-full lg:w-[20%] md:w-[20%] p-1 bg-slate-100 border hover:scale-105 transition hover:cursor-pointer shadow-lg rounded-lg">
            <img
              src={singleItem.photo}
              alt=""
              className="w-full object-cover rounded-t-lg"
            />
            <div className="p-2 text-left">
              <h3 className="text-stone-800 text-xl font-extrabold underline">
                {singleItem.name}
              </h3>
              <p className="text-stone-800 text-sm">{singleItem.description}</p>
            </div>
          </div>

          {/* START Item Description section */}
          <div className="w-full lg:w-[45%] md:w-[43%] p-5">
            <h1 className="font-bold text-3xl">Description</h1>
            <ul>
              <div className="flex gap-2">
                <li className="">Product Name : </li>{" "}
                <span>{singleItem.name}</span>
              </div>

              <div className="flex gap-2">
                <li className="">Model : </li> <span>{singleItem.model}</span>
              </div>
              <div className="flex gap-2">
                <li className="">Product Date : </li>{" "}
                <span>{singleItem.productDate}</span>
              </div>
              <div className="flex gap-2">
                <li className="">Description </li>
                <span>{singleItem.description}</span>
              </div>
            </ul>
          </div>
          {/* END Item Description section */}

          {/* START Add to cart and item status */}
          <div className="p-5 w-full lg:w-[20%] md:w-[30%]">
            <div className="p-5 h-[200px] flex flex-col justify-between border-t-2 border-b-2">
              <h1>{singleItem.price} Birr</h1>
              <h1>Status: {singleItem.status}</h1>
              <button
                onClick={handleAddToCart}
                // disabled={isSoldOut}
                className="px-2 py-1 w-full flex justify-around bg-green-500 hover:bg-green-700 transition-all text-white rounded-l"
              >
                Add To Cart <ShoppingBasketIcon />
              </button>
              <Toaster
                toastOptions={{
                  className: "",
                  style: {
                    border: "1px solid #713200",
                    padding: "5px",
                    color: "#713200",
                  },
                }}
              />
              <Link
                to="/cart"
                className="px-2 py-1 w-full flex justify-around bg-yellow-500 hover:bg-yellow-700 transition-all text-white rounded-l"
              >
                Go To Cart <ShoppingBasketIcon />
              </Link>
            </div>
          </div>
          {/* END Add to cart and item status */}
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
