import { useEffect, useState, useRef } from "react";
import "./Searchbar.css";
import { ChevronDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [showLocations, setShowLocations] = useState(false);

  const [guests, setGuests] = useState(1);
  const [showGuests, setShowGuests] = useState(false);

  // Refs for positioning dropdowns under exact clicked element
  const locationRef = useRef(null);
  const guestsRef = useRef(null);

  // Fetch listing locations
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/listings");
        const data = await res.json();

        const uniqueLocations = [
          ...new Set(data.map((listing) => listing.location)),
        ];

        setLocations(uniqueLocations);
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchListings();
  }, []);

  const handleLocationSelect = (loc) => {
    navigate(loc === "all" ? "/listings" : `/listings?location=${loc}`);
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

        {/* LOCATIONS DROPDOWN MODAL */}
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

        <span className="separator" />

        {/* CHECK IN */}
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

        {/* GUESTS DROPDOWN MODAL */}
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
