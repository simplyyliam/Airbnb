import { Schema, model } from 'mongoose';

const reservationSchema = new Schema({
  guest: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  accommodation: { type: Schema.Types.ObjectId, ref: 'Accommodation', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending','confirmed','cancelled','completed'], default: 'pending' }
}, { timestamps: true });


export default model('Reservation', reservationSchema);
