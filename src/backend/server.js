/* eslint-disable no-undef */
import express, { json } from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import listingRoutes from './routes/listings.js';
import bookingRoutes from './routes/bookings.js';
import reviewRoutes from './routes/reviews.js';

config();
connectDB();

const app = express();
app.use(json());
app.use(cors());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
