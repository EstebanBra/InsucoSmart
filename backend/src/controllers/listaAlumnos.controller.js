import Usuario from '../models/user.model.js';
import Atraso from '../models/atrasos.model.js';
import { Op } from 'sequelize';

export async function obtenerAlumnosConAtrasos(req, res) {
  try {
    // Obtiene todos los registros de Persona con el rol de 'alumno'
    const alumnos = await Usuario.findAll({
      where: { rol: 'Alumno' }, // Filtra por el rol 'alumno'
      attributes: ['nombre', 'rut','curso'], // Incluye estos atributos en el resultado
      include: [{
        model: Atraso, // Incluye la relación con Atraso
        attributes: ['totalatrasos'], // Incluye el atributo totalAtrasos de Atraso
      }],
    });

    // Procesa los datos obtenidos
    const result = alumnos.map(alumno => ({
      nombre: alumno.nombre,
      rut: alumno.rut, // Usa 'rut' si es el campo correcto para el RUT
      curso: alumno.curso,
      totalatrasos: alumno.Atrasos.map(atraso => atraso.totalatrasos) // Obtiene directamente el totalAtrasos
    }));
    console.log(result.totalatrasos);

    // Envía la respuesta en formato JSON
    res.json(result);
  } catch (error) {
    console.error('Error al encontrar alumnos:', error);
    res.status(500).json({ message: 'Error alumnos' });
  }
}


export async function obtenerAlumnosConAlertaAtraso(req, res) {
  try {
    // Obtiene todos los registros de Persona con el rol de 'alumno'
    const alumnos = await Usuario.findAll({
      where: { rol: 'Alumno' },
      attributes: ['nombre', 'rut','curso'],
      include: {
        model: Atraso,
        attributes: ['totalatrasos'],
        where: {
          totalatrasos: {
            [Op.gte]: 3
          }
        }
      }
    });
    // Filtra los alumnos que tienen atrasos
    const alumnosConAtrasos = alumnos.filter(alumno => alumno.Atrasos.length  > 0);
    res.json(alumnosConAtrasos); // Responde con la lista de alumnos con atrasos
  } catch (error) {
    console.error('Error al encontrar alumnos:', error);
    res.status(500).json({ message: 'Error alumnos' });
  }
}
