// routes/alumno.route.js
import { Router } from 'express';
import { registrarAtraso } from '../controllers/atrasos.controller.js';
import { generarJustificativo } from '../controllers/justificativo.controller.js';   
import { upload } from '../config/googleService.js'; // Importa 'upload'
import { aprobarJustificativo } from '../controllers/justificativo.controller.js';
import { datosJustificativo } from '../controllers/justificativo.controller.js';
import { rechazarJustificativo } from '../controllers/justificativo.controller.js';


const router = Router();

router.post('/obtener', registrarAtraso);
router.post('/upload-justificativo', upload.single('file'), generarJustificativo); // Agregar el middleware de upload
router.patch('/aceptar/:atraso_id',aprobarJustificativo);
router.patch('/rechazar/:atraso_id',rechazarJustificativo);
router.get('/justificativo/:atraso_id', datosJustificativo);

export default router;