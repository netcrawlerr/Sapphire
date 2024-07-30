/**
 *
 * search
 * filter, sort ,
 * check if product is in stock and show it
 * show products
 * add to cart
 *
 *
 */
import NavBar from "../components/NavBar";
import images from "../../utils/images";
import { useState } from "react";
import { BiCartAdd } from "react-icons/bi";

const Shop = () => {
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAddingToCart = (e) => {
    e.preventDefault();
    setCartItems(...cartItems);
    console.log("adding to cart....", cartItems);
  };
  return (
    <div className="">
      <NavBar />

      {/* sidebar and product area */}
      <div className="sidebar-product-container flex ">
        <div className=" sidebar  p-10 mt-[-40px] w-96">
          <form action="" className="">
            <input
              type="text"
              className="border border-black p-1 px-4 mr-2 w-full"
              placeholder="Type Product"
              onChange={handleInputChange}
            />
            {/* <button
              type="submit"
              className="bg-yellow-600 text-slate-100 font-bold px-3 py-1 mt-2 w-full "
            >
              Search
            </button> */}
          </form>
          {/* <h1 className="text-4xl capitalize">welcome</h1> */}
          <form action="" className="flex flex-col justify-start w-full ">
            <label htmlFor="category" className="m-1 mt-10 font-bold">
              Select Category
            </label>
            <select name="category" id="" className="m-1">
              <option value="all">All</option>
              <option value="laptops">Laptops</option>
              <option value="mobiles">Mobiles</option>
              <option value="laptop-accessories">Laptop Accessories</option>
              <option value="mobile-accessories">Mobile Accessories</option>
              <option value="networking-devices">Networking Devices</option>
            </select>

            <label htmlFor="priceRange" className="m-1 font-bold">
              Price Range
            </label>
            <select name="priceRange" id="" className="m-1">
              <option value="all">All</option>
              <option value="10000-20000">Less than 10000 Birr</option>
              <option value="10000-20000">10000-20000 Birr</option>
              <option value="20000-30000">20000-30000 Birr</option>
              <option value="30000-40000">30000-40000 Birr</option>
              <option value="40000-50000">40000-50000 Birr</option>
              <option value="40000-50000">Above 50000 Birr</option>
            </select>

            <label htmlFor="condition" className="m-1 font-bold">
              Condition
            </label>
            <select name="condition" id="" className="m-1">
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>

            <button
              type="submit"
              className="border  px-3 py-1 bg-yellow-600 hover:bg-yellow-700 transition-all text-slate-100 font-bold"
            >
              Apply Filter
            </button>
          </form>
        </div>
        <div className="products flex flex-wrap justify-around items-center gap-y-6 gap-x-6 lg:w-[950px] m-auto  w-screen ">
          {images
            .filter((item) => {
              return search === ""
                ? item.name
                : item.name.toLowerCase().includes(search.toLowerCase()); //mobile keyboard problem fix
            })
            .map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex-col text-center w-[300px] p-1 bg-slate-200 border hover:scale-105 transition hover:cursor-pointer shadow-lg rounded-lg"
                >
                  <img
                    src={item.url}
                    alt={item.name}
                    className="h-[200px] w-full object-cover rounded-t-lg"
                  />
                  <div className="p-2 text-left">
                    <h3 className="text-stone-800 text-xl font-extrabold underline">
                      {item.name}
                    </h3>
                    <div className="flex justify-between">
                      <p className="text-stone-800 text-sm mt-2">
                        {item.price} Birr
                      </p>
                      <button type="submit" onClick={handleAddingToCart}>
                        <BiCartAdd className="text-3xl text-yellow-600 font-bold" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Shop;
