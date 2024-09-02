import { Router } from 'express';
import { obtenerAlumnosConAtrasos } from '../controllers/listaAlumnos.controller.js';
import { obtenerAlumnosConAlertaAtraso } from '../controllers/listaAlumnos.controller.js';
import { obtenerAtrasosDeAlumno } from '../controllers/listaAlumnos.controller.js';
import { obtenerRutAlumno } from '../controllers/listaAlumnos.controller.js';
import { obtenerDatosAtraso } from '../controllers/listaAlumnos.controller.js';

const router = Router();

router.get('/alumnos', obtenerAlumnosConAtrasos);
router.get('/alumnosAlerta', obtenerAlumnosConAlertaAtraso);
router.get('/atrasosAlumno', obtenerAtrasosDeAlumno);
router.get('/rutAlumno', obtenerRutAlumno);
router.get('/tabla',obtenerDatosAtraso);


export default router;