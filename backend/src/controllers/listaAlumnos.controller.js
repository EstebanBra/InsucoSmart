import Persona from '../models/persona.model.js';
import Atraso from '../models/atrasos.model.js';

export async function obtenerAlumnosConAtrasos(req, res) {
  try {
    // Obtiene todos los registros de Persona con el rol de 'alumno'
    const alumnos = await Persona.findAll({
      where: { rol: 'alumno' }, // Filtra por el rol 'alumno'
      attributes: ['nombre', 'rut'], // Incluye estos atributos en el resultado
      include: [{
        model: Atraso, // Incluye la relación con Atraso
        attributes: ['totalatrasos'], // Incluye el atributo totalAtrasos de Atraso
      }],
    });

    // Procesa los datos obtenidos
    const result = alumnos.map(alumno => ({
      nombre: alumno.nombre,
      rut: alumno.run, // Usa 'run' si es el campo correcto para el RUT
      totalAtrasos: alumno.Atrasos.map(atraso => atraso.totalatrasos) // Obtiene directamente el totalAtrasos
    }));

    // Envía la respuesta en formato JSON
    res.json(result);
  } catch (error) {
    console.error('Error al encontrar alumnos:', error);
    res.status(500).json({ message: 'Error alumnos' });
  }
}
