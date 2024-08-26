import { HOST } from './config/configEnv.js';
import express, { urlencoded, json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './config/configDB.js';
import indexRoutes from './routes/index.routes.js';
import session from 'express-session';

async function setupServer() {
    try {
        const app = express();

        app.use(cors({ credentials: true, origin: true }));
        app.use(json());
        app.use(urlencoded({ extended: true }));
        app.use(morgan('dev'));

        // Esto es para poder obtener el rut de la sesion iniciada
        app.use(session({
            secret: '2024', // Cambia esta clave secreta por una propia
            resave: false,
            saveUninitialized: true
        }));

        app.use('/api', indexRoutes);

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
