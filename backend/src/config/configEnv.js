import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const envFilePath = path.resolve(_dirname, '.env');

dotenv.config({ path: envFilePath });

export const USERNAME = process.env.USER;
export const PASSWORD = process.env.PASSWORD;
export const HOST = process.env.HOST;
export const PORT = process.env.PORT;
export const DATABASE = process.env.DATABASE;