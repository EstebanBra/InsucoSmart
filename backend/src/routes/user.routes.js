import { Router } from 'express';
import { crearUsuario, listarAcademicos, eliminarUsuario, modificarUsuario} from '../controllers/user.controller.js';

const router = Router();

router.post('/crear', crearUsuario);
router.delete('/eliminar/:rut', eliminarUsuario);
router.get('/listar/academicos', listarAcademicos);
router.patch('/modificar/:rut', modificarUsuario);

export default router;