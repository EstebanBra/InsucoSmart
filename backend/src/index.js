import { PORT, HOST } from './config/configEnv.js';
import cors from "cors";
import express, { urlencoded, json } from 'express';
import morgan from 'morgan';
import { connectDB } from './config/configDB.js';
import indexRoutes from './routes/index.routes.js';

async function setupServer() {
    try {
        const app = express();

        // Agregamos los cors
        app.use(cors({ credentials: true, origin: true }));
        // Agrega el middleware para el manejo de datos en formato URL
        app.use(urlencoded({ extended: true }));
        // Agrega el middleware para el manejo de datos en formato JSON
        app.use(json());
         // Agregamos morgan para ver las peticiones que se hacen al servidor
        app.use(morgan('dev'));
         // Agrega el enrutador principal al servidor
        app.use('/api',indexRoutes);

        app.listen(3000, () => {
            console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
        });
    } catch (error) {
        console.log('Error en index.js -> setupServer(): ', error);
    }
}

async function setupAPI(){
    try {
        connectDB();
        setupServer(); 

    } catch (error) {
        console.log('Error en server.js -> setupAPI(): ', err);
    }
}

// Inicia la API
setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((err) => console.log('Error en server.js -> setupAPI(): ', err));