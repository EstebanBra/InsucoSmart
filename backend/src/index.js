import { PORT, HOST } from './config/configEnv.js';
import express, { urlencoded, json } from 'express';
import morgan from 'morgan';
import indexRoutes from './routes/index.routes.js';
import sequelize from './config/configDB.js';


async function setupServer() {
    try {

        const app = express();

        app.use(morgan('dev'));
        app.use(indexRoutes);

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
        });
    } catch (error) {
        console.error('Error en index.js -> setupServer(): ', error);
    }
}

setupServer();