import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { findOne, create } from '../models/User';

const signToken = (user) => {
  return sign({ id: user._id, role: user.role }, import.meta.env.VITE_JWT_SECRET, {
    expiresIn: import.meta.env.VITE_JWT_EXPIRES_IN || '7d'
  });
};

export async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { name, email, password } = req.body;
  const existing = await findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already registered' });

  const hashed = await hash(password, 12);
  const user = await create({ name, email, password: hashed });
  const token = signToken(user);
  res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
}

export async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { email, password } = req.body;
  const user = await findOne({ email }).select('+password');
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken(user);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
}
