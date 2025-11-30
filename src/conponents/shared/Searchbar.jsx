import { useEffect, useState, useRef } from "react";
import "./Searchbar.css";
import { ChevronDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios"

export default function Searchbar() {
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [showLocations, setShowLocations] = useState(false);

  const [guests, setGuests] = useState(1);
  const [showGuests, setShowGuests] = useState(false);

  const locationRef = useRef(null);
  const guestsRef = useRef(null);

  // Fetch listing cities using axios
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get("/api/listings");
         console.log("Axios baseURL inside component:", api.defaults.baseURL);

        const uniqueLocations = [
          ...new Set(
            res.data
              .map((listing) => listing.city)
              .filter(Boolean)
          ),
        ];

        setLocations(uniqueLocations);
      } catch (err) {
        console.log("Error loading cities:", err);
      }
    };

    fetchListings();
  }, []);

  const handleLocationSelect = (loc) => {
    navigate(loc === "all" ? "/listings" : `/listings?city=${loc}`);
    setShowLocations(false);
  };

  return (
    <div id="container">
      <div className="search-container">
        {/* LOCATIONS */}
        <div
          className="locations clickable"
          ref={locationRef}
          onClick={() => {
            setShowLocations(!showLocations);
            setShowGuests(false);
          }}
        >
          <div className="header">
            <h1>Locations</h1>
            <p>Select Location</p>
          </div>
          <ChevronDown className="icon" />
        </div>

        {showLocations && (
          <div
            className="dropdown-modal"
            style={{
              top: locationRef.current?.offsetTop + locationRef.current?.offsetHeight + 8,
              left: locationRef.current?.offsetLeft,
              width: locationRef.current?.offsetWidth,
            }}
          >
            <p onClick={() => handleLocationSelect("all")}>All Locations</p>

            {locations.map((loc, i) => (
              <p key={i} onClick={() => handleLocationSelect(loc)}>
                {loc}
              </p>
            ))}
          </div>
        )}

        {/* CHECK IN */}
        <span className="separator" />

        <div className="check-in">
          <div className="header">
            <h1>Check in</h1>
            <p>Add dates</p>
          </div>
        </div>

        <span className="separator" />

        {/* CHECK OUT */}
        <div className="checkout">
          <div className="header">
            <h1>Check out</h1>
            <p>Add dates</p>
          </div>
        </div>

        <span className="separator" />

        {/* GUESTS */}
        <div
          className="guests clickable"
          ref={guestsRef}
          onClick={() => {
            setShowGuests(!showGuests);
            setShowLocations(false);
          }}
        >
          <div className="header">
            <h1>Guests</h1>
            <p>{guests} guests</p>
          </div>
          <ChevronDown className="icon" />
        </div>

        {showGuests && (
          <div
            className="dropdown-modal"
            style={{
              top: guestsRef.current?.offsetTop + guestsRef.current?.offsetHeight + 8,
              left: guestsRef.current?.offsetLeft,
              width: guestsRef.current?.offsetWidth,
            }}
          >
            <div className="guest-row">
              <button onClick={() => setGuests(Math.max(1, guests - 1))}>-</button>
              <span>{guests}</span>
              <button onClick={() => setGuests(guests + 1)}>+</button>
            </div>
          </div>
        )}

        {/* SEARCH ICON */}
        <div className="search">
          <Search />
        </div>
      </div>
    </div>
  );
}
