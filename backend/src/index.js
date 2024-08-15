import express from 'express';
import morgan from 'morgan';
import alumnoRoutes from '/routes/alumno.routes.js';

async function inicializarServidor(){
try {
    const app = express();
    
    app.use(morgan('dev'));
    app.use(express.json());
        app.use('/alumnos', alumnoRoutes);
    
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
          console.log(`Servidor escuchando en el puerto ${PORT}`);
      });

    } catch (error) {
         console.log('Error en server.js -> setupAPI(): ', err);
    }
}
inicializarServidores ();