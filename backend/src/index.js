import { HOST } from './config/configEnv.js';
import express, { urlencoded, json } from 'express';
import morgan from 'morgan';
import { connectDB } from './config/configDB.js';
import indexRoutes from './routes/index.routes.js';
import { connectDB } from './config/configDB.js';

async function setupServer() {
    try {
        const app = express();
        
        app.use(json());
        app.use(urlencoded({ extended: true }));
        app.use(morgan('dev'));
         // Agrega el enrutador principal al servidor
        app.use('/api',indexRoutes);

        app.listen(3000, () => {
            console.log(`=> Servidor corriendo en http://${HOST}:3000`);
        });
    } catch (error) {
        console.error('Error en index.js -> setupServer(): ', error);
    }
}

async function setupAPI() {
    try {
        await connectDB();
        await setupServer();
    } catch (error) {
        console.error('Error en index.js -> setupAPI():', error);
    }
}

setupAPI()
    .then(() => console.log('=> API iniciada exitosamente'))
    .catch((error) => console.log('Error en index.js -> setupAPI():', error));