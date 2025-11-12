/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
const { sign } = jwt;

/**
 * The function generates a token for a given ID using a JWT secret and expiration time.
 * @param id - The `id` parameter is the unique identifier or user ID that will be included in the
 * token payload.
 * @returns A JWT token is being returned.
 */
export default function generateToken(id) {
  return sign(
    { id },
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRES_IN || '30d' }
  );
}
