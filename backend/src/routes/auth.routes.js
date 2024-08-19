import { Router } from 'express';
import { iniciarSesion, cerrarSesion } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', iniciarSesion);
router.post('/logout', cerrarSesion);

export default router;