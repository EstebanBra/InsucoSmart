import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

const _filename = fileURLToPath(import.meta.url); // Obtenemos la ruta del archivo actual
const _dirname = path.dirname(_filename); // Obtenemos la ruta del directorio que contiene el archivo actual
const envFilePath = path.resolve(_dirname, '.env');

dotenv.config({ path: envFilePath });

export const USERDB = process.env.USERDB;
export const PASSWORD = process.env.PASSWORD;
export const HOST = process.env.HOST;
export const PORT = process.env.PORT;
export const DATABASE = process.env.DATABASE;