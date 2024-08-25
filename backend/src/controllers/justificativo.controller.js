import Justificativo from '../models/justificativo.model.js';
import Usuario from '../models/user.model.js';
import { drive } from '../config/googleService.js'; // Asegúrate de que esta importación sea correcta
import { Readable } from 'stream';

export async function generarJustificativo(req, res) {
    try {
        const { rutpersona, motivo, estado } = req.body;
        const archivo = req.file;

        if (!rutpersona || !motivo || !estado) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        const usuario = await Usuario.findByPk(rutpersona);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        let archivo_url = null;

        if (archivo) {
            const archivoStream = Readable.from(archivo.buffer);
            const fileMetadata = {
                name: archivo.originalname,
                mimeType: archivo.mimetype
            };
            const media = {
                body: archivoStream
            };

            const driveResponse = await drive.files.create({
                resource: fileMetadata,
                media: media,
                fields: 'id, webViewLink'
            });

            const fileId = driveResponse.data.id;

            await drive.permissions.create({
                fileId: fileId,
                requestBody: {
                    role: 'reader',
                    type: 'anyone'
                }
            });

            archivo_url = driveResponse.data.webViewLink;
        }

        const nuevoJustificativo = await Justificativo.create({
            rutpersona,
            motivo,
            estado,
            archivo_url
        });

        res.status(201).json({
            justificativo: nuevoJustificativo,
            usuario: {
                nombre: usuario.nombre,
                rol: usuario.rol
            }
        });
    } catch (error) {
        console.error('Error subiendo justificativo:', error);
        res.status(500).json({ message: 'Error al subir justificativo' });
    }
}