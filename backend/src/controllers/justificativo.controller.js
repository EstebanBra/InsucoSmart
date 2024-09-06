import Justificativo from '../models/justificativo.model.js';
import Atraso from '../models/atrasos.model.js';
import { drive } from '../config/googleService.js'; // Asegúrate de que esta importación sea correcta
import { Readable } from 'stream';
import Usuario from '../models/user.model.js';
import Curso from '../models/curso.model.js';

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

export async function aprobarJustificativo(req, res) {
    const { atraso_id} = req.params;

    try {

        const justificativo = await Justificativo.findOne({
            where: {atraso_id: atraso_id}
        });

        if(!justificativo){
            return res.status(404).json({message: 'Justificativo no encontrado'});
        }
        justificativo.estado = 'Aprobado';
        await justificativo.save();

        const atraso = await Atraso.findByPk(atraso_id);
        atraso.estado = false;
        await atraso.save();

            res.status(200).json({ message: 'Atraso justificado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al justificar el atraso', error });
    }
}

export async function rechazarJustificativo(req, res) {
    const { atraso_id} = req.params;

    try {

        const justificativo = await Justificativo.findOne({
            where: {atraso_id: atraso_id}
        });

        if(!justificativo){
            return res.status(404).json({message: 'Justificativo no encontrado'});
        }
        justificativo.estado = 'Rechazado';
        await justificativo.save();
            res.status(200).json({ message: 'Atraso justificado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al justificar el atraso', error });
    }
}

export async function datosJustificativo(req, res){
    const { atraso_id } = req.params;

    try {
      const justificativo = await Justificativo.findOne({
        where: { atraso_id: atraso_id },
        include: [
            {
                model: Atraso,
                include : [
                    { 
                        model: Usuario,
                        include: [
                            {
                                model: Curso
                            }
                        ]
                    }
                ]
            }
        ]
      });
  
      if (!justificativo) {
        return res.status(404).json({ message: 'Justificativo no encontrado' });
      }
  
      const datosJustificativo = {
        motivo: justificativo.motivo,
        archivo_url: justificativo.archivo_url,
        atraso: {
        fecha: justificativo.Atraso.fecha,
            hora: justificativo.Atraso.hora,
            rutpersona: justificativo.Atraso.rutpersona,
            alumno: {
                nombre: justificativo.Atraso.Usuario.nombre,
                curso: justificativo.Atraso.Usuario.Curso.numero_curso
            }
        }
      };
      
      res.status(200).json(datosJustificativo);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener datos del justificativo', error });
    }
}