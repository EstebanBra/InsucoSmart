import { Router } from 'express';
import { crearUsuario } from '../controllers/user.controller.js';

const router = Router();

router.get('/');
router.post('/crearUsuario', crearUsuario);

export default router;