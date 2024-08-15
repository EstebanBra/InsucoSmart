import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('Response de prueba');
})

/*

    AGREGAR RUTAS PRINCIPALES DEL PROYECTO

*/

export default router;