import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth'
import accommodationRoutes from './routes/accommodations';
import reservationRoutes from './routes/reservations';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(json());
if (import.meta.env.NODE_ENV !== 'production') app.use(morgan('dev'));

app.get('/', (req, res) => res.json({ ok: true, msg: 'Airbnb capstone backend' }));

app.use('/api/auth', authRoutes);
app.use('/api/accommodations', accommodationRoutes);
app.use('/api/reservations', reservationRoutes);

// main error handler
app.use(errorHandler);

export default app;
