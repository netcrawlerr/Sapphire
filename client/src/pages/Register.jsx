import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS

// Custom hook to handle map events
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
  const [shippingAddress, setShippingAddress] = useState("");
  const [city, setCity] = useState("");

  const [location, setLocation] = useState([9.08192, 38.7525]); // Default to Nairobi, Kenya
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleShippingAddressChange = (e) => {
    setShippingAddress(e.target.value);
  };

  const handleMapClick = async (latlng) => {
    setMarkerPosition([latlng.lat, latlng.lng]);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json&addressdetails=1`
      );
      const data = await response.json();

      if (data && data.address) {
        // Build a more detailed address from available address components
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

        setShippingAddress(detailedAddress);
      } else {
        alert("Unable to fetch address for selected location");
      }
    } catch (error) {
      console.error("Error fetching reverse geocoding data:", error);
      alert("Error fetching reverse geocoding data");
    }
  };

  const handleRegister = async (e) => {
    e.prevernDefault();
    const response = await axios.post("/api/auth/register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      phoneNumber: phoneNumber,
      city: city,
      shippingAddress: shippingAddress,
    });

    const data = await response.data;
    console.log(data);
  };
  console.log(shippingAddress);
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="border mb-5 w-1/2 p-1 outline-none shadow px-3"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <input
            className="border mb-5 p-1 outline-none shadow w-full px-3"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex justify-between gap-3">
            <input
              className="border mb-5 p-1 w-1/2 outline-none shadow px-3"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="border mb-5 p-1 w-1/2 outline-none shadow px-3"
              type="password"
              name="confirmPassword"
              id="password"
              placeholder="Confirm Password"
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
            name="shippingAddress"
            placeholder="Shipping Address"
            value={shippingAddress}
            onChange={handleShippingAddressChange}
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
                  <Popup>{shippingAddress}</Popup>
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
