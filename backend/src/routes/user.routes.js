import { Router } from 'express';
import { crearUsuario, listarAcademicos, eliminarUsuario } from '../controllers/user.controller.js';

const router = Router();

router.post('/crear', crearUsuario);
router.delete('/eliminar/:rut', eliminarUsuario);
router.get('/listar/academicos', listarAcademicos);

export default router;