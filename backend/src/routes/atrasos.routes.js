// routes/alumno.route.js
import { Router } from 'express';
import { registrarAtraso } from '../controllers/atrasos.controller.js';

const router = Router();

router.post('/obtener', registrarAtraso);

export default router;