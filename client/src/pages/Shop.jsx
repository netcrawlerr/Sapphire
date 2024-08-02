import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { BiCartAdd } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../utils/useCart";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [viewFilter, setViewFilter] = useState(true);

  // Filter states
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState("all");
  const [condition, setCondition] = useState("all");

  const { setSingleItem } = useCart();

  const fetchProducts = async () => {
    const response = await axios.get("/api/products");
    const data = await response.data;
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/products/filter", {
      category,
      price,
      condition,
    });
    const filteredProducts = await response.data;
    setProducts(filteredProducts);
  };

  const handleClearFilter = () => {
    setCategory("all");
    setPrice("all");
    setCondition("all");
    fetchProducts(); // Re-fetch products to reset to default state
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleToggleFilter = () => {
    setViewFilter((prev) => !prev);
  };

  const handleSingleItemClick = async (item) => {
    setSingleItem(item);
  };

  return (
    <div>
      <NavBar />

      <button
        onClick={handleToggleFilter}
        className="border bg-stone-600 text-white font-bold p-1 rounded mb-5"
      >
        {viewFilter ? "Hide Filter" : "Show Filter"}
      </button>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            viewFilter ? "translate-x-0 w-[280px]" : "-translate-x-[300px] w-0"
          } sticky  left-0   shadow-lg z-10`}
        >
          <div className="sidebar p-10 w-full ">
            <form action="" className="">
              <input
                type="text"
                className="border border-black p-1 px-4 mr-2 w-full"
                placeholder="Type Product"
                onChange={handleInputChange}
              />
            </form>
            <form
              action=""
              onSubmit={filterProducts}
              className="flex flex-col justify-start w-full"
            >
              <label htmlFor="category" className="m-1 mt-10 font-bold">
                Select Category
              </label>
              <select
                name="category"
                id=""
                className="m-1"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">All</option>
                <option value="laptops">Laptops</option>
                <option value="mobiles">Mobiles</option>
                <option value="earphones">Earphones</option>
                <option value="networking-devices">Networking Devices</option>
                <option value="mouses">Mouses</option>
                <option value="keyboards">Keyboards</option>
                <option value="flashes">Flashes</option>
                <option value="hard-disks">Hard Disks</option>
                <option value="ssd">SSD</option>
                <option value="batteries">Batteries</option>
              </select>

              <label htmlFor="price" className="m-1 font-bold">
                Price Range
              </label>
              <select
                name="price"
                id=""
                className="m-1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              >
                <option value="all">All</option>
                <option value="below 10000">Less than 10000 Birr</option>
                <option value="10000-20000">10000-20000 Birr</option>
                <option value="20000-30000">20000-30000 Birr</option>
                <option value="30000-40000">30000-40000 Birr</option>
                <option value="40000-50000">40000-50000 Birr</option>
                <option value="above 50000">Above 50000 Birr</option>
              </select>

              <label htmlFor="condition" className="m-1 font-bold">
                Condition
              </label>
              <select
                name="condition"
                id=""
                className="m-1"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="all">All</option>
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>

              <button
                type="submit"
                className="border px-3 py-1 bg-green-500 hover:bg-green-700 transition-all text-slate-100 font-bold"
              >
                Apply Filter
              </button>
              <button
                type="button"
                className="border px-3 py-1 my-2 bg-slate-600 hover:bg-slate-700 transition-all text-slate-100 font-bold"
                onClick={handleClearFilter}
              >
                Clear Filter
              </button>
            </form>
          </div>
        </div>
        {/* Sidebar ends */}

        {/* Product section */}
        <div
          className={`flex-1 flex justify-center flex-wrap gap-y-6 gap-x-6 px-5 ml-0 transition-all duration-500 ease-in-out ${
            viewFilter ? "ml-[-40px]" : "ml-0"
          }`}
        >
          {products.length === 0 ? (
            <h1 className="text-red-800 text-4xl">No Products 🥺</h1>
          ) : (
            products
              .filter((item) => {
                if (!item || !item.name) {
                  return false;
                }
                return search === ""
                  ? item.name
                  : item.name.toLowerCase().includes(search.toLowerCase());
              })
              .map((item, index) => (
                <Link
                  onClick={() => handleSingleItemClick(item)}
                  to="/addtocart"
                  key={index}
                  className="flex-col text-center w-[250px] p-1 bg-slate-200 border hover:scale-105 transition-transform hover:cursor-pointer shadow-lg rounded-lg"
                >
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="h-[150px] w-full object-cover rounded-t-lg"
                  />
                  <div className="p-2 text-left">
                    <h3 className="text-stone-800 text-l font-bold">
                      {item.name}
                    </h3>
                    <div className="flex justify-between">
                      <p className="text-stone-800 text-sm mt-2">
                        {item.price} Birr
                      </p>
                      <BiCartAdd className="text-3xl text-yellow-600 font-bold" />
                    </div>
                  </div>
                </Link>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
