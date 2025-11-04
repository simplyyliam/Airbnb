import { Router } from 'express';
const router = Router();
import { createReservation, getByUser, getForHost, updateStatus, cancelByGuest } from '../controllers/reservationController';
import { authMiddleware } from '../middleware/auth';
import { reservationValidator } from '../utils/validators';

router.post('/', authMiddleware, reservationValidator, createReservation);
router.get('/me', authMiddleware, getByUser);
router.get('/host', authMiddleware, getForHost);
router.patch('/:id/status', authMiddleware, updateStatus);
router.patch('/:id/cancel', authMiddleware, cancelByGuest);

export default router;
