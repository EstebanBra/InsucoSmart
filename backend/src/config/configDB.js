import { Sequelize } from 'sequelize';
import { USERDB, PASSWORD, HOST, PORT, DATABASE } from './configEnv.js';

const sequelize = new Sequelize(DATABASE, USERDB, PASSWORD, {
    host: HOST,
    port: PORT,
    dialect: 'postgres', // Especifica el tipo de base de datos que se está utilizando
    logging: false // Oculta las consultas mostradas en la consola de la base de datos
});

export async function connectDB() {
    try {
        await sequelize.authenticate(); // Autentica la conexión a la base de datos
        await sequelize.sync(); // Sincroniza los modelos con la base de datos
        console.log('Base de datos conectada exitosamente!');
    } catch (error) {
        console.error('Error en configDB.js -> connectDB(): ', error);
    }
}

export default sequelize;
