import { Router } from 'express';
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';

const router = Router();

router.get('/');
router.use('/autenticacion', authRoutes);
router.use('/usuario', userRoutes);

export default router;