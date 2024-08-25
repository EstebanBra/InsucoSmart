import { google } from 'googleapis';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import streamifier from 'streamifier';  // Importa streamifier

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo credentials.json
const CREDENTIALS_PATH = path.join(__dirname, '../config/credentials.json');

const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

// Configura multer para almacenar archivos en la memoria temporalmente
const upload = multer({
    storage: multer.memoryStorage(),
});

export { drive, upload, streamifier };  // Exporta streamifier