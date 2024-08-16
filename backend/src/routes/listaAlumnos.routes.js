import { Router } from 'express';
import { obtenerAlumnosConAtrasos } from '../controllers/listaAlumnos.controller.js';

const router = Router();

router.get('/alumnos', obtenerAlumnosConAtrasos);

export default router;