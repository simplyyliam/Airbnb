import asyncHandler from "express-async-handler";
import Listing from "../models/Listing.js"; 

/* The `export const getListings` function is a controller function that handles the logic
of fetching listings based on certain criteria. */
export const getListings = asyncHandler(async (req, res) => {
  const { city, minPrice, maxPrice, guests, q, host } = req.query;
  const filter = { active: true };


  if (city) filter.city = new RegExp(city, "i");
  if (minPrice || maxPrice) filter.price = {};
  if (minPrice) filter.price.$gte = Number(minPrice);
  if (maxPrice) filter.price.$lte = Number(maxPrice);
  if (guests) filter.guests = { $gte: Number(guests) };
  if (q) filter.$text = { $search: q };

  if (host) filter.host = host;

  const listings = await Listing.find(filter).populate("host", "name avatar"); 
  res.json(listings);
});

/* The `createListing` function is a controller function that handles the creation of a new listing.*/
export const createListing = asyncHandler(async (req, res) => {
  const data = { ...req.body, host: req.user._id };
  const listing = await Listing.create(data); 
  res.status(201).json(listing);
});

/* The `getListingById` function is a controller function that fetches a specific listing by its ID. It
uses the `Listing` model to find the listing based on the ID provided in the request parameters. If
the listing is not found, it sets the response status to 404 and throws an error indicating that the
listing was not found. If the listing is found, it initiates the `host` field with the `name` and
`avatar` properties and sends the listing data in the response as JSON. */
export const getListingById = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate("host", "name avatar");
  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }
  res.json(listing);
});

/* The `updateListing` function is a controller function that handles the updating of a listing. */
export const updateListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }
  if (listing.host.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not the host of this listing");
  }
  Object.assign(listing, req.body);
  await listing.save();
  res.json(listing);
});

/* The `deleteListing` function is a controller function that handles the deactivation of
a listing. */
export const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }
  if (listing.host.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not the host of this listing");
  }
  listing.active = false; // soft delete
  await listing.save();
  res.json({ message: "Listing deactivated" });
});
