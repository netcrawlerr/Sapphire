import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <NavBar />
      <Hero />

      <section className="mt-24  ">
        <h1
          id="featured"
          className="text-4xl text-purple-800 font-bold text-center mb-10"
        >
          Featured Products
        </h1>

        <div className="flex flex-wrap justify-around items-center gap-y-6 gap-x-6 lg:w-[950px] m-auto ">
          <div className="flex-col text-center w-[300px] p-1 bg-slate-200 border hover:scale-105 transition hover:cursor-pointer shadow-lg rounded-lg">
            <img
              src="/mac2.jpg"
              alt=""
              className="h-[200px] w-full object-cover rounded-t-lg"
            />
            <div className="p-2 text-left">
              <h3 className="text-stone-800 text-xl font-extrabold underline">
                MACBOOK Pro
              </h3>
              <p className="text-stone-800 text-sm">
                An Apple Inc product to streamline your programming experience
                with secure coding.
              </p>
            </div>
          </div>

          <div className="flex-col text-center w-[300px] p-1 bg-slate-200 border hover:scale-105 transition hover:cursor-pointer shadow-lg rounded-lg">
            <img
              src="/samsung1.jpg"
              alt=""
              className="h-[200px] w-full object-cover rounded-t-lg"
            />
            <div className="p-2 text-left">
              <h3 className="text-stone-800 text-xl font-extrabold underline">
                MACBOOK Pro
              </h3>
              <p className="text-stone-800 text-sm">
                An Apple Inc product to streamline your programming experience
                with secure coding.
              </p>
            </div>
          </div>

          <div className="flex-col text-center w-[300px] p-1 bg-slate-200 border hover:scale-105 transition hover:cursor-pointer shadow-lg rounded-lg">
            <img
              src="/mac1.jpg"
              alt=""
              className="h-[200px] w-full object-cover rounded-t-lg"
            />
            <div className="p-2 text-left">
              <h3 className="text-stone-800 text-xl font-extrabold underline">
                MACBOOK Pro
              </h3>
              <p className="text-stone-800 text-sm">
                An Apple Inc product to streamline your programming experience
                with secure coding.
              </p>
            </div>
          </div>

          <div className="flex-col text-center w-[300px] p-1 bg-slate-200 border hover:scale-105 transition hover:cursor-pointer shadow-lg rounded-lg">
            <img
              src="/mac2.jpg"
              alt=""
              className="h-[200px] w-full object-cover rounded-t-lg"
            />
            <div className="p-2 text-left">
              <h3 className="text-stone-800 text-xl font-extrabold underline">
                MACBOOK Pro
              </h3>
              <p className="text-stone-800 text-sm">
                An Apple Inc product to streamline your programming experience
                with secure coding.
              </p>
            </div>
          </div>

          <div className="flex-col text-center w-[300px] p-1 bg-slate-200 border hover:scale-105 transition hover:cursor-pointer shadow-lg rounded-lg">
            <img
              src="/samsung1.jpg"
              alt=""
              className="h-[200px] w-full object-cover rounded-t-lg"
            />
            <div className="p-2 text-left">
              <h3 className="text-stone-800 text-xl font-extrabold underline">
                MACBOOK Pro
              </h3>
              <p className="text-stone-800 text-sm">
                An Apple Inc product to streamline your programming experience
                with secure coding.
              </p>
            </div>
          </div>

          <div className="flex-col text-center w-[300px] p-1 bg-slate-200 border hover:scale-105 transition hover:cursor-pointer shadow-lg rounded-lg">
            <img
              src="/mac1.jpg"
              alt=""
              className="h-[200px] w-full object-cover rounded-t-lg"
            />
            <div className="p-2 text-left">
              <h3 className="text-stone-800 text-xl font-extrabold underline">
                MACBOOK Pro
              </h3>
              <p className="text-stone-800 text-sm">
                An Apple Inc product to streamline your programming experience
                with secure coding.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 
      <footer className="flex flex-col lg:flex-row md:flex-row sm:flex-col  justify-around items-center gap-x-20 bg-stone-950 mt-5 text-slate-300">
        <div className="flex-col justify-center items-center ">
          <h1 className="text-2xl font-bold">Our Socials</h1>
          <h1 className="hover:text-yellow-600 hover:cursor-pointer">
            <Link to="/">Facebook</Link>
          </h1>
          <h1 className="hover:text-yellow-600 hover:cursor-pointer">
            <Link to="/">Instagram</Link>
          </h1>
        </div>
        <div className="flex-col justify-center items-center ">
          <h1 className="text-2xl font-bold">Contact</h1>
          <h1 className="hover:text-yellow-600 hover:cursor-pointer">
            <Link to="/">Email: sapphire@gmail.com</Link>
          </h1>
          <h1 className="hover:text-yellow-600 hover:cursor-pointer">
            Phone (+251954728474)
          </h1>
        </div>
        <div className="flex-col justify-center items-center ">
          <h1 className="text-2xl font-bold">Address</h1>
          <h1 className="hover:text-yellow-600 hover:cursor-pointer">
            Addis Ababa
          </h1>
          <h1 className="hover:text-yellow-600 hover:cursor-pointer">Adama</h1>
          <h1 className="hover:text-yellow-600 hover:cursor-pointer">
            Hawassa
          </h1>
        </div>
      </footer> */}

    
    </div>
  );
};

export default Landing;
