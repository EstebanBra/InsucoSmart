import Usuario from '../models/user.model.js';
import Atraso from '../models/atrasos.model.js';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export async function registrarAtraso(req, res) {
  const { rut } = req.body; // Recibimos el RUT en el cuerpo de la solicitud

  try {
    // Obtener la fecha y hora actual en Santiago, Chile
    const now = new Date();
    const fecha = format(now, 'yyyy-MM-dd', { locale: es });
    const hora = format(now, 'HH:mm:ss', { locale: es });

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
      fecha: fecha,
      hora: hora,
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
      fecha: nuevoAtraso.fecha, // Mostramos la fecha del nuevo atraso
      hora: nuevoAtraso.hora
    });
  } catch (error) {
    console.error('Error registrando el atraso:', error);
    return res.status(500).json({ message: 'Error registrando el atraso' });
  }
}