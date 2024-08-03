import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

//  map events
const MapEvents = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
};

// Update the map view
const UpdateMapView = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setaddress] = useState("");
  const [city, setCity] = useState("");

  const [location, setLocation] = useState([9.08192, 38.7525]); // Default to Nairobi, Kenya
  const [markerPosition, setMarkerPosition] = useState(null);

  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleaddressChange = (e) => {
    setaddress(e.target.value);
  };

  const handleMapClick = async (latlng) => {
    setMarkerPosition([latlng.lat, latlng.lng]);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json&addressdetails=1`
      );
      const data = await response.json();

      if (data && data.address) {
        const { road, city, town, village, suburb, county, state, country } =
          data.address;
        const detailedAddress = [
          road || "",
          village || town || city || "",
          county || state || "",
          country || "",
        ]
          .filter((part) => part)
          .join(", ");

        setaddress(detailedAddress);
      } else {
        alert("Unable to fetch address for selected location");
      }
    } catch (error) {
      console.error("Error fetching reverse geocoding data:", error);
      alert("Error fetching reverse geocoding data");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    try {
      const response = await axios.post("/api/auth/register", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        phoneNumber: phoneNumber,
        city: city,
        address: address,
      });

      const data = await response.data;
      console.log("data is ", data);
      if (data) {
        navigate("/login");
      }
    } catch (err) {
      if (err.response && err.response.data.errors) {
        console.log("error is ", err.response.data.errors);
        const emailError = err.response.data.errors.find(
          (error) =>
            error.path === "email" && error.msg.includes("already exists")
        );
        if (emailError) {
          setEmailError("Email already exists. Please use a different email.");
        }
        const passwordError = err.response.data.errors.find(
          (error) =>
            error.path === "password" && error.msg.includes("do not match")
        );
        if (passwordError) {
          setPasswordError("Passwords do not match. Please try again.");
        }
      } else {
        console.error("An unexpected error occurred:", err);
      }
    }
  };
  console.log(address);
  return (
    <div className="flex flex-row justify-center h-screen">
      <div className="mt-28">
        <div className="text-5xl text-yellow-600 mb-5 text-center">
          Sapphire
        </div>
        <form
          method="post"
          onSubmit={handleRegister}
          action=""
          className="flex flex-col w-[400px] p-5 border-black"
        >
          <div className="flex justify-between gap-3">
            <input
              className="border mb-5 p-1 w-1/2 outline-none shadow px-3"
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="border mb-5 w-1/2 p-1 outline-none shadow px-3"
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          {emailError && <h1 className="text-red-600">{emailError}</h1>}
          <input
            className="border mb-5 p-1 outline-none shadow w-full px-3"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {passwordError && <h1 className="text-red-600">{passwordError}</h1>}
          <div className="flex justify-between gap-3">
            <input
              className="border mb-5 p-1 w-1/2 outline-none shadow px-3"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="border mb-5 p-1 w-1/2 outline-none shadow px-3"
              type="password"
              name="confirmPassword"
              id="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between gap-3">
            <input
              className="border mb-5 p-1 w-1/2 outline-none shadow px-3"
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              className="border mb-5 p-1 w-1/2 outline-none shadow px-3"
              type="text"
              name="city"
              placeholder="Residence"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <input
            className="border mb-5 p-1 outline-none shadow w-full px-3"
            type="text"
            name="address"
            placeholder="Address"
            value={address}
            onChange={handleaddressChange}
          />
          <div style={{ height: "200px", width: "100%" }}>
            <MapContainer
              center={location}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={true} // Enable scroll wheel zoom
            >
              <UpdateMapView center={location} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapEvents onMapClick={handleMapClick} />
              {markerPosition && (
                <Marker position={markerPosition}>
                  <Popup>{address}</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
          <button
            className="bg-yellow-500 border mt-5 rounded-sm w-100 p-1"
            type="submit"
          >
            Register
          </button>
          <p className="flex gap-2 text-sm mt-3">
            Already Have An Account?
            <Link to="/login" className="text-blue-600 font-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
