import Justificativo from '../models/justificativo.model.js';
import Atraso from '../models/atrasos.model.js';
import { drive } from '../config/googleService.js'; // Asegúrate de que esta importación sea correcta
import { Readable } from 'stream';

export async function generarJustificativo(req, res) {
    try {
        const { motivo, fecha, hora } = req.body;
        const archivo = req.file;
        const estado = 'porRevisar';    

        // Obtener el RUT del alumno que está en sesion
        const rutpersona = req.session.rut;
        if (!rutpersona) {
          return res.status(401).json({ message: 'No autenticado' });     
        }

        if (!motivo || !fecha || !hora ) {
            return res.status(400).json({ message: 'Faltan datos necesarios' });
        }

        // Buscar el atraso específico usando el RUT, fecha y hora
        const atraso = await Atraso.findOne({
            where: { rutpersona, fecha, hora }
        });

        if (!atraso) {
            return res.status(404).json({ message: 'Atraso no encontrado' });
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
            archivo_url,
            atraso_id: atraso.atraso_id
        });

        res.status(201).json({
            justificativo: nuevoJustificativo
        });
    } catch (error) {
        console.error('Error subiendo justificativo:', error);
        res.status(500).json({ message: 'Error al subir justificativo' });
    }
}