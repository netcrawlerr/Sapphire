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
  );
};

export default Landing;
