import Usuario from '../models/user.model.js';
import Atraso from '../models/atrasos.model.js';

export async function obtenerAlumnosConAtrasos(req, res) {
  try {
    // Obtiene todos los registros de Persona con el rol de 'alumno'
    const alumnos = await Usuario.findAll({
      where: { rol: 'Alumno' }, // Filtra por el rol 'alumno'
      attributes: ['nombre', 'rut'], // Incluye estos atributos en el resultado
      include: [{
        model: Atraso, // Incluye la relación con Atraso
        attributes: ['totalatrasos'], // Incluye el atributo totalAtrasos de Atraso
      }],
    });

    // Procesa los datos obtenidos
    const result = alumnos.map(alumno => ({
      nombre: alumno.nombre,
      rut: alumno.rut, // Usa 'rut' si es el campo correcto para el RUT
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
      where: { rol: 'Alumno' }, // Filtra por el rol 'alumno'
      attributes: ['nombre', 'rut'], // Incluye estos atributos en el resultado
    });
    
    const atrasados = await Atraso.findAll({
      where: {
        rut: '12345678-9', // Reemplaza por el RUT que deseas buscar
        atrasos: {
          [Op.gte]: 3 // Tres o más atrasos
        }
      }
    });
  } catch (error) {
    console.error('Error al encontrar alumnos:', error);
    res.status(500).json({ message: 'Error alumnos' });
  }
}
