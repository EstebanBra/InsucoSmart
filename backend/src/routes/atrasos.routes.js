// routes/alumno.route.js
import { Router } from 'express';
import { registrarAtraso } from '../controllers/atrasos.controller.js';
import { generarJustificativo } from '../controllers/justificativo.controller.js';   
import { upload } from '../config/googleService.js'; // Importa 'upload'

const router = Router();

router.post('/obtener', registrarAtraso);
router.post('/upload-justificativo', upload.single('file'), generarJustificativo); // Agregar el middleware de upload

export default router;