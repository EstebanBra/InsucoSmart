import { Router } from 'express';
import { obtenerAlumnosConAtrasos } from '../controllers/listaAlumnos.controller.js';
import { obtenerAlumnosConAlertaAtraso } from '../controllers/listaAlumnos.controller.js';
const router = Router();

router.get('/alumnos', obtenerAlumnosConAtrasos);
router.get('/alumnosAlerta', obtenerAlumnosConAlertaAtraso);

export default router;