import asyncHandler from "express-async-handler";
import User from "../models/User.js";

/* The `export const getUserById` function is an asynchronous function that handles the logic for
retrieving a user by their ID. Here's a breakdown of what it does: */
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user);
});

/* The `updateUser` function is checking if the user making the request is authorized to update the
user information. It compares the ID of the user making the request (`req.user._id`) with the ID of
the user being updated (`req.params.id`) and also checks if the user making the request is an admin
(`req.user.isAdmin`). If the conditions are not met, it sets the response status to 403 (Forbidden)
and throws an error indicating that the user is not authorized to update the user. */
export const updateUser = asyncHandler(async (req, res) => {
  if (req.user._id.toString() !== req.params.id && !req.user.isAdmin) {
    res.status(403);
    throw new Error("Not authorized to update this user");
  }
  
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = req.body.name || user.name;
  user.avatar = req.body.avatar || user.avatar;
  if (req.body.password) user.password = req.body.password;

  await user.save();
  res.json({ message: "User updated" });
});
