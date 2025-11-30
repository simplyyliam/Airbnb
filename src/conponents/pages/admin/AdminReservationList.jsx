import { useEffect, useState } from "react";
import { Box } from "../../shared";
import api from "../../../api/axios";
import "./RerservationList.css";

export default function ReservationList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isHost = user?.isHost;
  const userId = user?._id;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const url = isHost
          ? "/bookings/host/me"
          : `/bookings/user/${userId}`;

        const res = await api.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookings(res.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId && token) fetchBookings();
  }, [token, userId, isHost]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    try {
      await api.delete(`/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings((prev) => prev.filter((b) => b._id !== id));
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
            <th>{isHost ? "Booked by" : "My Name"}</th>
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
                <td>
                  {isHost
                    ? booking.user?.name || "Unknown"
                    : user?.name || "Me"}
                </td>
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
