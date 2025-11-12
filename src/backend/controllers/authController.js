import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateTokens.js";

/* The `registerUser` function is responsible for handling the registration process for a new user. */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isHost } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include name, email and password");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password, isHost });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isHost: user.isHost,
    token: generateToken(user._id),
  });
});

/* The `loginUser` function is responsible for handling the login functionality. */
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isHost: user.isHost,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

export const getMe = asyncHandler(async (req, res) => {
  res.json(req.user);
});
