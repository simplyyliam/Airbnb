import { Router } from 'express';
const router = Router();
import { register, login } from '../controllers/authController';
import { registerValidator, loginValidator } from '../utils/validators';

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);

export default router;
