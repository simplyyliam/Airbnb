import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
startDate: { type: Date, required: true },
endDate: { type: Date, required: true },
guests: { type: Number, default: 1 },
totalPrice: { type: Number, required: true },
status: { type: String, enum: ['pending','confirmed','cancelled','completed'], default: 'pending' }
}, { timestamps: true });


export default mongoose.model('Booking', BookingSchema);
