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
        attributes: ['atraso'], // Incluye el atributo totalAtrasos de Atraso
      }],
    });

    // Procesa los datos obtenidos
    const result = alumnos.map(alumno => ({
      nombre: alumno.nombre,
      rut: alumno.rut, // Usa 'rut' si es el campo correcto para el RUT
      curso: alumno.curso,
      totalatrasos: alumno.Atrasos.reduce((acumulado, atraso) => acumulado + atraso.atraso, 0)
    }));
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
        attributes: ['atraso'] // Cambie esta linea y quite otras cuantas
      }
    });
     // Filtra los alumnos que tienen atrasos
     const alumnosConAtrasos = alumnos.filter(alumno => alumno.Atrasos.length > 0).map(alumno => ({
      nombre: alumno.nombre,
      rut: alumno.rut,
      curso: alumno.curso,
      totalatrasos: alumno.Atrasos.reduce((acumulado, atraso) => acumulado + atraso.atraso, 0) // cambie esta linea
    }));

    // Filtra los alumnos que tienen más de 3 atrasos
    const alumnosConMasDe3Atrasos = alumnosConAtrasos.filter(alumno => alumno.totalatrasos >= 3); // agregue esta linea

    res.json(alumnosConMasDe3Atrasos); // Responde con la lista de alumnos con atrasos
  } catch (error) {
    console.error('Error al encontrar alumnos:', error);
    res.status(500).json({ message: 'Error alumnos' });
  }
}

export async function obtenerAtrasosDeAlumno(req, res) {
  try {
    // Obtener el RUT del alumno que está en sesion
    const rutAlumno = req.session.rutAlumno;
    
        if (!rutAlumno) {
            return res.status(401).json({ message: 'No autenticado' });
        }
    console.log('RUT del alumno:', rutAlumno);

    // Buscar los atrasos del alumno
    const atrasos = await Atraso.findAll({
      where: { rutpersona: rutAlumno },
      attributes: ['atraso', 'descripcion', 'fecha']
    });

    // Responder con la lista de atrasos
    res.json(atrasos);
  } catch (error) {
    console.error('Error al obtener atrasos:', error);
    res.status(500).json({ message: 'Error atrasos' });
  }
}
export async function obtenerRutAlumno(req, res) {
  try {
    const rutAlumno = req.session.rutAlumno;
    if (!rutAlumno) {
      return res.status(401).json({ message: 'No autenticado' });
    }
    res.json({ rut: rutAlumno });
  } catch (error) {
    console.error('Error al obtener RUT del alumno:', error);
    res.status(500).json({ message: 'Error RUT' });
  }
}
