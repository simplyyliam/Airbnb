import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ListingDetails.css";

export default function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [nights, setNights] = useState(1);

  useEffect(() => {
    async function loadListing() {
      const res = await fetch(`http://localhost:5000/api/listings/${id}`);
      const data = await res.json();
      setListing(data);
    }
    loadListing();
  }, [id]);

  if (!listing) return <div className="loading">Loading...</div>;

  const cleaningFee = 50;
  const serviceFee = 30;
  const total = (listing.price * nights) + cleaningFee + serviceFee;

  return (
    <div className="details-container">

      {/* TITLE */}
      <h1 className="details-title">{listing.title}</h1>
      <div className="details-subheader">
        <span className="location">{listing.location}</span>
        <span className="rating">⭐ {listing.rating || 4.8}</span>
        <span className="reviews">(120 reviews)</span>
      </div>

      {/* IMAGE GALLERY */}
      <div className="gallery">
        <img className="gallery-large" src={listing.images[0]} alt="" />
        <div className="gallery-grid">
          {listing.images.slice(1, 5).map((img, index) => (
            <img key={index} src={img} className="gallery-small" alt="" />
          ))}
        </div>
      </div>

      {/* MAIN CONTENT (LEFT + RIGHT) */}
      <div className="details-main">

        {/* LEFT SIDE */}
        <div className="left">

          {/* HOST SECTION */}
          <div className="host-box">
            <h2>Hosted by {listing.host?.name || "John Doe"}</h2>
            <p>Superhost · 2 years hosting</p>
          </div>

          <hr />

          {/* DESCRIPTION */}
          <div className="description">
            <p>{listing.description || "A beautiful place to stay near everything."}</p>
          </div>

          <hr />

          {/* AMENITIES */}
          <div className="amenities">
            <h3>What this place offers</h3>
            <ul>
              {listing.amenities?.map((am, index) => (
                <li key={index}>• {am}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* RIGHT SIDE — BOOKING BOX */}
        <div className="right">
          <div className="booking-card">
            <h3>${listing.price} <span>/ night</span></h3>

            <div className="nights-select">
              <label>Nights:</label>
              <input 
                type="number"
                min="1"
                value={nights}
                onChange={e => setNights(Number(e.target.value))}
              />
            </div>

            <div className="price-breakdown">
              <p>Nightly price: <span>${listing.price * nights}</span></p>
              <p>Cleaning fee: <span>${cleaningFee}</span></p>
              <p>Service fee: <span>${serviceFee}</span></p>
              <hr />
              <p className="total">Total: <span>${total}</span></p>
            </div>

            <button className="reserve-btn">Reserve</button>
          </div>
        </div>

      </div>

    </div>
  );
}
