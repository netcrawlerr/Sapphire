<<<<<<< HEAD
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import NavBar from "../components/NavBar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import images from "../../utils/images.js";
const Landing = () => {
  return (
    <section>
      <div>
        <NavBar />

        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 px-8 my-[-30px]">
          <div className="flex flex-col justify-center lg:w-[600px] w-full">
            <h1 className="text-stone-700 font-extrabold text-3xl md:text-4xl lg:text-5xl p-4 mb-5">
              Discover the latest, trending and efficient{" "}
              <span className="text-green-500">LAPTOPS MOBILES</span> and their Accessories and many more!
            </h1>

            <p className="px-5 mb-5 text-base md:text-lg lg:text-xl">
              Visit us today! Elevate your tech experience at Tech Haven – where
              the latest meets affordability.
            </p>
            <Link to="/shop">
              <button className="border mx-3 my-5 bg-yellow-500 hover:bg-yellow-800 transition text-white p-3 rounded-xl w-40 outline-emerald-700">
                Shop Now
              </button>
            </Link>
          </div>

          <div className="relative w-full  lg:w-[600px] md:w-[500px] xs:w-full h-[250px] md:h-[300px] lg:h-[400px]">
            <Carousel
              showStatus={false}
              showIndicators={true}
              showThumbs={false}
              autoPlay
              infiniteLoop
              transitionTime={500}
              interval={4000}
            >
              {images.map((img, index) => (
                <div
                  key={index}
                  className="w-full h-full flex items-center justify-center"
                >
                  <img
                    className="w-full h-full object-cover rounded-xl"
                    src={img.url}
                    alt={img.name}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
=======
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

        <div className="flex flex-wrap justify-around items-center gap-y-6 gap-x-6 md:gap-x-2 md:w-[800px] lg:w-[950px] m-auto ">
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
>>>>>>> 7af1ad55f7a3423806c8d4cf2a74f1aca6501943
  );
};

export default Landing;
