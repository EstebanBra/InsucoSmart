import { Router } from 'express';
import { crearUsuario, listarAcademicos } from '../controllers/user.controller.js';

const router = Router();

router.post('/crear', crearUsuario);
router.get('/listar/academicos', listarAcademicos);

export default router;