import Persona from '../models/persona.model.js';
import Atraso from '../models/atrasos.model.js';

export async function registrarAtraso(req, res) {
  const { rut } = req.body; // Recibimos el RUT en el cuerpo de la solicitud

  try {
    // Buscamos la persona por su RUT
    const persona = await Persona.findOne({ where: { rut: rut } });

    if (!persona) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }

    // Contamos el total de atrasos actuales del alumno
    const totalAtrasos = await Atraso.count({ where: { rutpersona: persona.rut } });

    // Registramos el nuevo atraso con el total actualizado
    const atraso = await Atraso.create({
      rutpersona: persona.rut,
      descripcion: 'Atraso registrado',
      totalatrasos: totalAtrasos + 1, // Actualizamos el total acumulado
      fechaHoraIngreso: new Date()
    });

    // Creamos un objeto con los datos del alumno y el atraso
    const datosAtraso = {
      nombre: persona.nombre,
      rut,
      totalAtrasos: totalAtrasos + 1, // Total acumulado después de registrar el nuevo atraso
      fechaHoraIngreso: atraso.fechaHoraIngreso
    };

    return res.json(datosAtraso);
  } catch (error) {
    console.error('Error registrando el atraso:', error);
    return res.status(500).json({ message: 'Error registrando el atraso' });
  }
}
