import { Router } from 'express';

// Enrutador para atrasos
import atrasosRoutes from './atrasos.routes.js';
// Enrutador para lista de alumnos
import listaAlumnosRoutes from './listaAlumnos.routes.js';

const router = Router();

router.get('/', (req, res) => {
    res.send('Response de prueba');
})

// Define la ruta para los atrasos /api/atraso
router.use('/atraso', atrasosRoutes);
// Define la ruta para obtener lista alumnos con atrasos /api/atraso
router.use('/atraso', listaAlumnosRoutes);

/*

    AGREGAR RUTAS PRINCIPALES DEL PROYECTO

*/

export default router;