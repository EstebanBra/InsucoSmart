import Usuario from '../models/user.model.js';
import Atraso from '../models/atrasos.model.js';


export async function registrarAtraso(req, res) {
  const { rut } = req.body; // Recibimos el RUT en el cuerpo de la solicitud

  try {
    // Buscamos la persona por su RUT
    const persona = await Usuario.findOne({ where: { rut: rut } });

    if (!persona) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }

    // Buscamos el atraso existente para el estudiante
    const atraso = await Atraso.findOne({ where: { rutpersona: persona.rut } });

    if (!atraso) {
      // Si no existe un atraso, creamos uno nuevo
      const nuevoAtraso = await Atraso.create({
        rutpersona: persona.rut,
        descripcion: 'Atraso registrado',
        totalatrasos: 1,
        fechaHoraIngreso: new Date()
      });
      return res.json({
        nombre: persona.nombre,
        rut,
        totalAtrasos: 1,
        curso: persona.curso,
        fechaHoraIngreso: nuevoAtraso.fechaHoraIngreso
      });
    } else {
      // Si existe un atraso, actualizamos el total de atrasos
      await atraso.update({ totalatrasos: atraso.totalatrasos + 1 });

      return res.json({
        nombre: persona.nombre,
        rut,
        totalAtrasos: atraso.totalatrasos,
        curso: persona.curso,
        fechaHoraIngreso: new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" })
      });
    }
  } catch (error) {
    console.error('Error registrando el atraso:', error);
    return res.status(500).json({ message: 'Error registrando el atraso' });
  }
}