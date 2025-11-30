/* eslint-disable no-undef */
import dotenv from "dotenv";
import User from "./models/User.js";
import Listing from "./models/Listing.js";
import Review from "./models/Review.js";
import connectDB from "./config/db.js";

import { usersData } from "./data/user.js";
import { listingsData } from "./data/listing.js"; // now a function
import { FakeReviews } from "./data/faker.js";

dotenv.config();

const seedDB = async () => {
  try {
    // Connect to the database once
    await connectDB();

    // Insert users
    const createdUsers = await User.insertMany(usersData);

    // Generate listings with host IDs dynamically
    const listingsWithHosts = listingsData(createdUsers.map((u) => u._id));
    const createdListings = await Listing.insertMany(listingsWithHosts);

    // Assign listings and users to reviews dynamically
    const reviewsToInsert = FakeReviews.generate(
      createdUsers.map((u) => u._id),
      createdListings.map((l) => l._id)
    );

    await Review.insertMany(reviewsToInsert);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDB();
