import asyncHandler from "express-async-handler";
import Booking from "../models/Booking.js"; 
import Listing from "../models/Listing.js"; 


/* The `createBooking` function is responsible for creating a new booking based on the data provided in
the request body. */
export const createBooking = asyncHandler(async (req, res) => {
  const { listingId, startDate, endDate, guests } = req.body;
  if (!listingId || !startDate || !endDate) {
    res.status(400);
    throw new Error("Missing booking data");
  }

  const listing = await Listing.findById(listingId); 
  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }

  const overlap = await Booking.findOne({  
    listing: listingId,
    $or: [
      { startDate: { $lte: new Date(endDate) }, endDate: { $gte: new Date(startDate) } }
    ]
  });

  if (overlap) {
    res.status(400);
    throw new Error("Dates not available");
  }

  const nights = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
  const totalPrice = nights * listing.price;

  const booking = await Booking.create({  
    listing: listingId,
    user: req.user._id,
    startDate,
    endDate,
    guests,
    totalPrice,
  });

  res.status(201).json(booking);
});

/* The `getBookingById` function is responsible for retrieving a specific booking by its ID. It uses
the `Booking` model to find the booking based on the ID provided in the request parameters. */
export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id) 
    .populate("listing")
    .populate("user", "name email");

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }
  res.json(booking);
});

/* The `getBookingsForUser` function is responsible for retrieving all bookings associated with a
specific user. It uses the `Booking` model to find all bookings where the `user` field matches the
`userId` provided in the request parameters. It then initiates the `listing` field in each booking
to include additional details about the listing associated with the booking. Therefore, it then sends the
retrieved bookings as a JSON response back to the client. */
export const getBookingsForUser = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.params.userId }).populate("listing"); 
  res.json(bookings);
});

/* The `cancelBooking` function is responsible for canceling a booking based on the booking ID provided
in the request parameters. */
export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }
  if (booking.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not your booking");
  }
  booking.status = "cancelled";
  await booking.save();
  res.json({ message: "Booking cancelled" });
});


// GET all bookings for listings owned by the host
export const getHostBookings = asyncHandler(async (req, res) => {
  const hostId = req.user._id;

  // Find all listings that belong to this host
  const hostListings = await Listing.find({ host: hostId });

  if (hostListings.length === 0) {
    return res.json([]); 
  }

  const listingIds = hostListings.map(listing => listing._id);

  // Find bookings on these listings
  const bookings = await Booking.find({ listing: { $in: listingIds } })
    .populate("user", "name email")
    .populate("listing", "title location");

  res.json(bookings);
});

export const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  // Only the user who created the booking OR the host can delete it
  const listing = await Listing.findById(booking.listing);

  const isOwner = booking.user.toString() === req.user._id.toString();
  const isHost = listing.host.toString() === req.user._id.toString();

  if (!isOwner && !isHost) {
    res.status(403);
    throw new Error("You do not have permission to delete this booking");
  }

  await booking.deleteOne();
  res.json({ message: "Booking deleted successfully" });
});
