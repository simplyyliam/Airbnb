import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
title: { type: String, required: true },
description: { type: String },
address: { type: String },
city: { type: String },
country: { type: String },
price: { type: Number, required: true },
guests: { type: Number, default: 1 },
bedrooms: { type: Number, default: 1 },
bathrooms: { type: Number, default: 1 },
images: [{ type: String }],
amenities: [{ type: String }],
ratingsAverage: { type: Number, default: 0 },
ratingsQuantity: { type: Number, default: 0 },
active: { type: Boolean, default: true }
}, { timestamps: true });


export default mongoose.model('Listing', ListingSchema);