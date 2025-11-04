import { validationResult } from 'express-validator';
import Reservation from '../models/Reservation';
import Accommodation from '../models/Accommodation';

function daysBetween(a, b) {
  const ms = Math.abs(new Date(b) - new Date(a));
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export const createReservation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { accommodation: accommodationId, startDate, endDate } = req.body;
  const accommodation = await Accommodation.findById(accommodationId);
  if (!accommodation) return res.status(404).json({ message: 'Accommodation not found' });

  const start = new Date(startDate);
  const end = new Date(endDate);
  if (start >= end) return res.status(400).json({ message: 'Invalid dates' });

  const overlapping = await Reservation.findOne({
    accommodation: accommodationId,
    $or: [
      { startDate: { $lte: end }, endDate: { $gte: start } }
    ],
    status: { $in: ['pending','confirmed'] }
  });

  if (overlapping) return res.status(409).json({ message: 'Dates not available' });

  const nights = daysBetween(start, end);
  const totalPrice = nights * accommodation.pricePerNight;

  const reservation = await Reservation.create({
    guest: req.user.id,
    accommodation: accommodationId,
    startDate: start,
    endDate: end,
    totalPrice,
    status: 'pending'
  });

  res.status(201).json(reservation);
};

export const getByUser = async (req, res) => {
  const reservations = await Reservation.find({ guest: req.user.id }).populate('accommodation').sort('-createdAt');
  res.json(reservations);
};

export const getForHost = async (req, res) => {
  const accommodations = await Accommodation.find({ host: req.user.id }).select('_id');
  const accommodationIds = accommodations.map(a => a._id);
  const reservations = await Reservation.find({ accommodation: { $in: accommodationIds } }).populate('guest', 'name email');
  res.json(reservations);
};

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const reservation = await Reservation.findById(id).populate('accommodation');
  if (!reservation) return res.status(404).json({ message: 'Not found' });

  const acc = reservation.accommodation;
  if (acc.host.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const { status } = req.body;
  if (!['pending','confirmed','cancelled','completed'].includes(status)) return res.status(400).json({ message: 'Invalid status' });

  reservation.status = status;
  await reservation.save();
  res.json(reservation);
};

export const cancelByGuest = async (req, res) => {
  const { id } = req.params;
  const reservation = await Reservation.findById(id);
  if (!reservation) return res.status(404).json({ message: 'Not found' });
  if (reservation.guest.toString() !== req.user.id && req.user.role !== 'admin')
    return res.status(403).json({ message: 'Forbidden' });

  reservation.status = 'cancelled';
  await reservation.save();
  res.json(reservation);
};
