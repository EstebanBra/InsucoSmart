import { HOST, PORT } from './config/configEnv.js';
import express, { urlencoded, json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './config/configDB.js';
import indexRoutes from './routes/index.routes.js';
import session from 'express-session';
import crearAdministrador from './config/initSetup.js';

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

        app.listen(PORT, () => {
            console.log(`=> Servidor corriendo en http://${HOST}:${PORT}`);
        });
    } catch (error) {
        console.error('Error en index.js -> setupServer(): ', error);
    }
}

async function setupAPI() {
    try {
        await connectDB();
        await setupServer();
        await crearAdministrador();
    } catch (error) {
        console.error('Error en index.js -> setupAPI():', error);
    }
}

setupAPI()
    .then(() => console.log('=> API iniciada exitosamente'))
    .catch((error) => console.log('Error en index.js -> setupAPI():', error));
