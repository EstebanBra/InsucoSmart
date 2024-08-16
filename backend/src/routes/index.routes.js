import { Router } from 'express';
import { crearUsuario } from '../controllers/user.controller.js';

// Enrutador para atrasos
import atrasosRoutes from './atrasos.routes.js';
// Enrutador para lista de alumnos
import listaAlumnosRoutes from './listaAlumnos.routes.js';

const router = Router();

// Define la ruta para los atrasos /api/atraso
router.use('/atraso', atrasosRoutes);
// Define la ruta para obtener lista alumnos con atrasos /api/atraso
router.use('/atraso', listaAlumnosRoutes);

router.get('/');
router.post('/crearUsuario', crearUsuario);

export default router;