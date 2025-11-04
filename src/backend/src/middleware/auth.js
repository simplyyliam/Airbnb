import { verify } from 'jsonwebtoken';
import { findById } from '../models/User';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'Authorization token missing' });

  const token = authHeader.split(' ')[1];
  try {
    const payload = verify(token, import.meta.env.VITE_JWT_SECRET);
    // attach user id and role
    req.user = { id: payload.id, role: payload.role };
    // optionally load user
    req.userDoc = await findById(payload.id).select('-password');
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid/Expired token' });
  }
};

const requireRole = (roles = []) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  if (!Array.isArray(roles)) roles = [roles];
  if (roles.length && !roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

export default { authMiddleware, requireRole };
