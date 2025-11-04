import { Router } from 'express';
const router = Router();
import { getAll, getOne, createAccommodation, update, remove } from '../controllers/accommodationController';
import { authMiddleware } from '../middleware/auth';
import { accommodationCreateValidator } from '../utils/validators';

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', authMiddleware, accommodationCreateValidator, createAccommodation);
router.put('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, remove);

export default router;
