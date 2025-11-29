import { useEffect, useState } from "react";
import { Box } from "../../shared";
import "./RerservationList.css";

export default function ReservationList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token"); // whatever you're using for auth

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bookings/host/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch host bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) return <p>Loading bookings...</p>;

  return (
    <Box className="table-container">
      <table className="bookings-table">
        <thead>
          <tr>
            <th>Booked by</th>
            <th>Property</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", opacity: 0.7 }}>
                No reservations yet.
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.user?.name || "Unknown"}</td>
                <td>{booking.listing?.title || "Deleted listing"}</td>
                <td>{booking.startDate?.substring(0, 10)}</td>
                <td>{booking.endDate?.substring(0, 10)}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(booking._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Box>
  );
}
