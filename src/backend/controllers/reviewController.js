import asyncHandler from 'express-async-handler';
import Review from '../models/Review.js'; 
import Listing from '../models/Listing.js'; 


/* The `export const createReview` function is a controller function that is responsible for creating a new review for a listing. */
export const createReview = asyncHandler(async (req, res) => {
  const { listingId, rating, comment } = req.body;
  if (!listingId || !rating) {
    res.status(400);
    throw new Error('Missing review data');
  }

  const listing = await Listing.findById(listingId); 
  if (!listing) {
    res.status(404);
    throw new Error('Listing not found');
  }

  const existing = await Review.findOne({ listing: listingId, user: req.user._id }); 
  if (existing) {
    res.status(400);
    throw new Error('You already reviewed this listing');
  }

  const review = await Review.create({ listing: listingId, user: req.user._id, rating, comment }); 

  // Update listing stats
  const reviews = await Review.find({ listing: listingId }); 
  const ratingsQuantity = reviews.length;
  const ratingsAverage = reviews.reduce((s, r) => s + r.rating, rating) / (ratingsQuantity || 1);
  listing.ratingsQuantity = ratingsQuantity;
  listing.ratingsAverage = ratingsAverage;
  await listing.save();

  res.status(201).json(review);
});

/* The `export const getReviewsForListing` function is a controller function that retrieves all reviews
associated with a specific listing. It uses the `Review` model to find all reviews that have the
`listing` field matching the `listingId` parameter passed in the request. */
export const getReviewsForListing = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ listing: req.params.listingId }).populate('user', 'name avatar'); 
  res.json(reviews);
});
