import { Router } from 'express';
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';
import atrasosRoutes from './atrasos.routes.js';
import listaAlumnosRoutes from './listaAlumnos.routes.js';

const router = Router();

router.use('/atraso', atrasosRoutes);
router.use('/atraso', listaAlumnosRoutes);
router.get('/');
router.use('/auth', authRoutes);
router.use('/usuario', userRoutes);


export default router;