import { Link } from "react-router-dom";


export default function ListingCard({ listing }) {
  return (
    <Link to={`/listings/${listing._id}`} className="listing-card">
      <div className="ratio">
        <img
          src={listing.images?.[0] || "/hero.jpg"}
          alt={listing.title}
        />
      </div>

      <div className="listing-content">
        <div className="listing-header">
          <div className="listing-title-subtitle">
            <p>{listing.location}</p>
            <h1>{listing.title}</h1>
          </div>

          <span>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.9934 9.64423C14.0607 7.47996 10.8378 6.89778 8.41625 8.8796C5.9947 10.8614 5.65378 14.1749 7.55543 16.5189L15.9934 24.3333L24.4314 16.5189C26.3331 14.1749 26.0338 10.8406 23.5706 8.8796C21.1074 6.91862 17.9261 7.47996 15.9934 9.64423Z"
                stroke="#374151"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <hr />

        <div className="listing-details">
          <p>
            {listing.guests} guests · {listing.type} · {listing.beds} beds ·{" "}
            {listing.baths} bath
          </p>
          <p>{listing.amenities?.slice(0, 3).join(" · ")}</p>
        </div>

        <hr />

        <div className="listing-footer">
          <h1>
            {listing.rating} ({listing.reviews} reviews)
          </h1>
          <span>${listing.price} /night</span>
        </div>
      </div>
    </Link>
  );
}
