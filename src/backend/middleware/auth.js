import jwt from 'jsonwebtoken'; 
const { verify } = jwt;
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

/* The `protect` function is a middleware function in this JavaScript code snippet. It is designed to
protect routes by verifying the authorization token provided in the request headers. */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      // eslint-disable-next-line no-undef
      const decoded = verify(token, process.env.JWT_SECRET); // use process.env
      req.user = await User.findById(decoded.id).select('-password'); 
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed', error);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export function hostOnly(req, res, next) {
  if (!req.user || !req.user.isHost) {
    res.status(403);
    throw new Error('Host access only');
  }
  next();
}
