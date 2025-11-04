import { Schema, model } from 'mongoose';

const accomodationSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  location: {
    address: { type: String },
    city: { type: String, required: true },
    country: { type: String, required: true }
  },
  pricePerNight: { type: Number, required: true, min: 0 },
  host: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  maxGuests: { type: Number, default: 2 },
  images: [{ type: String }],
  amenities: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default model('Accommodation', accomodationSchema);
