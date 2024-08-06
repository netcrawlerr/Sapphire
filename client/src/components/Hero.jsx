import images from "../utils/images.js";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useStore from "../utils/zus";
const Hero = () => {
  const { isLoggedIn, setIsLoggedIn } = useStore();
  console.log("at hero isLoggedIn", isLoggedIn);

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-8 px-8 my-[-30px]">
      <div className="flex flex-col justify-center lg:w-[600px] w-full mb-10">
        <h1 className="text-stone-700 font-extrabold text-3xl md:text-4xl lg:text-5xl p-4 mb-5">
          Discover the latest, trending and efficient{" "}
          <span className="text-yellow-600">LAPTOPS MOBILES</span> and their
          Accessories and <span className="text-yellow-600">many more.</span>
        </h1>

        <p className="px-5 mb-5 text-base md:text-lg lg:text-xl">
          Visit us today! Elevate your tech experience at{" "}
          <span className="text-yellow-600 font-bold">SAPPHIRE</span> – where
          the latest meets affordability.
        </p>
        <Link to={isLoggedIn ? "/shop" : "/login"} className="w-40">
          <button className="border mx-3 my-5 bg-yellow-600 hover:bg-yellow-800 transition text-white p-3 rounded-xl w-full outline-emerald-700">
            Shop Now
          </button>
        </Link>
      </div>

      <div className="relative w-full  lg:w-[500px] md:w-[500px]  xs:w-full xs:h-[250px] md:h-[400px] lg:h-[400px] bg-slate-400 p-3 md:py-2">
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
              className="w-full h-full  flex items-center justify-center"
            >
              <img
                className="w-full h-full object-cover rounded-xl "
                src={img.url}
                alt={img.name}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Hero;
