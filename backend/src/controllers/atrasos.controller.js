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

    // Creamos un nuevo atraso para el estudiante
    const nuevoAtraso = await Atraso.create({
      rutpersona: persona.rut,
      atraso: 1,
      descripcion: 'Atraso registrado',
      fecha: new Date() // Utilizamos la fecha actual del modelo
    });

    // Buscamos todos los atrasos del estudiante
    const atrasos = await Atraso.findAll({ where: { rutpersona: persona.rut } });

    // Contamos el total de atrasos
    const totalAtrasos = atrasos.length;

    return res.json({
      nombre: persona.nombre,
      rut,
      totalAtrasos,
      curso: persona.curso,
      fechaHoraIngreso: nuevoAtraso.fecha // Mostramos la fecha del nuevo atraso
    });
  } catch (error) {
    console.error('Error registrando el atraso:', error);
    return res.status(500).json({ message: 'Error registrando el atraso' });
  }
}