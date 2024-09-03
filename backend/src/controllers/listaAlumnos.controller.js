import Usuario from '../models/user.model.js';
import Atraso from '../models/atrasos.model.js';
import Curso from '../models/curso.model.js';


export async function obtenerAlumnosConAtrasos(req, res) {
  try {
    // Obtiene todos los registros de Persona con el rol de 'alumno'
    const alumnos = await Usuario.findAll({
      where: { rol: 'Alumno' }, // Filtra por el rol 'alumno'
      attributes: ['nombre', 'rut'], // Incluye estos atributos en el resultado
      include: [{
        model: Atraso, // Incluye la relación con Atraso
        attributes: [] // No es necesario incluir atributos específicos aquí
      },{
        model: Curso,
        attributes: ['numero_curso']
      }]
    });

    const result = await Promise.all(alumnos.map(async alumno => {
      const totalAtrasos = await Atraso.count({
        where: { rutpersona: alumno.rut, estado: true }
      });

      return {
        nombre: alumno.nombre,
        rut: alumno.rut,
        curso: alumno.Curso.numero_curso,
        totalatrasos: totalAtrasos // Total de atrasos por rut
      };
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
    const alumnos = await Usuario.findAll({
      where: { rol: 'Alumno' },
      attributes: ['nombre', 'rut'],
      include: [{
        model: Atraso,
        attributes: []
      }, {
        model: Curso,
        attributes: ['numero_curso']
      }]
    });

    // Filtra los alumnos que tienen atrasos
    const result = await Promise.all(alumnos.map(async alumno => {
      const totalAtrasos = await Atraso.count({
        where: { rutpersona: alumno.rut, estado: true }
      });

      return {
        nombre: alumno.nombre,
        rut: alumno.rut,
        curso: alumno.Curso.numero_curso,
        totalatrasos: totalAtrasos
      };
    }));

    // Filtra los alumnos que tienen más de 3 atrasos
    const alumnosConAlertaAtrasos = result.filter(alumno => alumno.totalatrasos >= 3);

    res.json(alumnosConAlertaAtrasos);
  } catch (error) {
    console.error('Error al encontrar alumnos:', error);
    res.status(500).json({ message: 'Error alumnos' });
  }
}

export async function obtenerAtrasosDeAlumno(req, res) {
  try {
    // Obtener el RUT del alumno que está en sesion
    const rutAlumno = req.session.rut;
    console.log('RUT del alumno:', rutAlumno);
        if (!rutAlumno) {
            return res.status(401).json({ message: 'No autenticado' });
        }

    // Buscar los atrasos del alumno
    const atrasos = await Atraso.findAll({
      where: { rutpersona: rutAlumno },
      attributes: ['fecha','hora']
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
    const rutAlumno = req.session.rut;
    if (!rutAlumno) {
      return res.status(401).json({ message: 'No autenticado' });
    }
    res.json({ rut: rutAlumno });
  } catch (error) {
    console.error('Error al obtener RUT del alumno:', error);
    res.status(500).json({ message: 'Error RUT' });
  }
}
