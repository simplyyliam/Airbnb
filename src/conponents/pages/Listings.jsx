import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Listing.css";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadListings() {
      try {
        const res = await fetch("http://localhost:5000/api/listings");
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.error("Error loading listings:", error);
      } finally {
        setLoading(false);
      }
    }
    loadListings();
  }, []);

  if (loading) return <div className="loading">Loading listings...</div>;

  return (
    <div className="listings-container">
      <h1 className="listings-title">Explore All Listings</h1>

      <div className="listings-grid">
        {listings.map((item) => (
          <Link 
            to={`/listings/${item._id}`} 
            key={item._id}
            className="listing-card"
          >
            {/* IMAGE */}
            <div className="listing-img-wrapper">
              <img 
                src={item.images?.[0] || "https://via.placeholder.com/300"} 
                alt={item.title}
                className="listing-img"
              />
            </div>

            {/* DETAILS */}
            <div className="listing-info">
              <div className="listing-header">
                <h3 className="listing-title">{item.title}</h3>
                <span className="listing-rating">⭐ {item.rating || 4.8}</span>
              </div>

              <p className="listing-location">{item.location}</p>
              <p className="listing-price">
                <strong>${item.price}</strong> / night
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
