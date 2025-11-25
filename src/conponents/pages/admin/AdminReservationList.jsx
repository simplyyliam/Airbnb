
import { Box } from "../../shared";
import "./RerservationList.css";

const bookingsData = [
  {
    bookedBy: "Johann Coetzee",
    property: "Property 1",
    checkin: "19/06/2024",
    checkout: "24/06/2024",
  },
  {
    bookedBy: "Asif Hassam",
    property: "Property 2",
    checkin: "19/06/2024",
    checkout: "19/06/2024",
  },
  {
    bookedBy: "Kago Kola",
    property: "Property 1",
    checkin: "25/06/2024",
    checkout: "30/06/2024",
  },
];

export default function ReservationList() {
  return (
    <Box className="table-container">
      <table className="bookings-table">
        <thead>
          <tr>
            <th>Booked by</th>
            <th>Property</th>
            <th>Checkin</th>
            <th>Checkout</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookingsData.map((booking, index) => (
            <tr key={index}>
              <td>{booking.bookedBy}</td>
              <td>{booking.property}</td>
              <td>{booking.checkin}</td>
              <td>{booking.checkout}</td>
              <td>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}
