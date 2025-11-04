import { validationResult } from 'express-validator';
import Accommodation from '../models/Accommodation';
import Reservation from '../models/Reservation';

export const createAccommodation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const data = { ...req.body, host: req.user.id };
  const acc = await Accommodation.create(data);
  res.status(201).json(acc);
};

export const getAll = async (req, res) => {
  const { city, minPrice, maxPrice, limit = 20, page = 1 } = req.query;
  const filter = {};
  if (city) filter['location.city'] = city;
  if (minPrice) filter.pricePerNight = { ...(filter.pricePerNight || {}), $gte: Number(minPrice) };
  if (maxPrice) filter.pricePerNight = { ...(filter.pricePerNight || {}), $lte: Number(maxPrice) };

  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Accommodation.find(filter).populate('host', 'name email').skip(skip).limit(Number(limit)).lean(),
    Accommodation.countDocuments(filter)
  ]);
  res.json({ items, total, page: Number(page), limit: Number(limit) });
};

export const getOne = async (req, res) => {
  const acc = await Accommodation.findById(req.params.id).populate('host', 'name email');
  if (!acc) return res.status(404).json({ message: 'Accommodation not found' });
  res.json(acc);
};

export const update = async (req, res) => {
  const acc = await Accommodation.findById(req.params.id);
  if (!acc) return res.status(404).json({ message: 'Not found' });
  if (acc.host.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  Object.assign(acc, req.body);
  await acc.save();
  res.json(acc);
};

export const remove = async (req, res) => {
  const acc = await Accommodation.findById(req.params.id);
  if (!acc) return res.status(404).json({ message: 'Not found' });
  if (acc.host.toString() !== req.user.id && req.user.role !== 'admin')
    return res.status(403).json({ message: 'Forbidden' });


  const active = await Reservation.findOne({ accommodation: acc._id, endDate: { $gte: new Date() } });
  if (active) return res.status(400).json({ message: 'Cannot delete - active reservations exist' });

  await acc.deleteOne();
  res.json({ message: 'Deleted' });
};
