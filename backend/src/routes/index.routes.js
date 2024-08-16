import { Router } from 'express';
import userRoutes from './user.routes.js';

const router = Router();

router.get('/');
router.use('/usuario', userRoutes);

export default router;