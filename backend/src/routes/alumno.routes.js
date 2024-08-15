import express from 'express';
import { obtenerAlumnoPorRut} from '../controllers/alumno.controller.js';

const router = express.Router();

router.get('/:rut', obtenerAlumnoPorRut);

export default router;
