import { HOST, PASS_SECRET } from './config/configEnv.js';
import express, { urlencoded, json } from 'express';
import session from 'express-session';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './config/configDB.js';
import indexRoutes from './routes/index.routes.js';

async function setupServer() {
    try {
        const app = express();

        app.use(session({
            name: 'miCookie',
            secret: `${PASS_SECRET}`,
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false } // En producción establecer en true para que la cookie solo se envie a través de HTTPS
        }));
        app.use(cors({ credentials: true, origin: true }));
        app.use(json());
        app.use(urlencoded({ extended: true }));
        app.use(morgan('dev'));
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
