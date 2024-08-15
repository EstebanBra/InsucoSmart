import { Sequelize } from 'sequelize';
import { USERNAME, PASSWORD, HOST, PORT, DATABASE} from './configEnv.js'

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: HOST,
    port: PORT,
    dialect: 'postgres', // Es esencial para que Sequelize sepa cómo comunicarse con el tipo de base de datos que estás utilizando. En este caso postgres.
    logging: true, // Agrega esta línea
});

export async function connectDB() {
    try {
        await sequelize.authenticate(); // Autentica la conexión a la base de datos
        console.log('Conexión a la base de datos establecida con éxito.');
        
        await sequelize.sync(); // Sincronizar los modelos con la base de datos
        console.log('Modelos sincronizados con la base de datos.');
    } catch (error) {
        console.error('Error en configDB.js -> connectDB(): ', error);
    }
}

export default sequelize;

