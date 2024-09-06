import Usuario from '../models/user.model.js';
import Atraso from '../models/atrasos.model.js';
import Curso from '../models/curso.model.js';
import Imparte from '../models/imparte.model.js';
import Materia from '../models/materia.model.js';

export async function obtenerDatosAtraso(req, res) {
  try {
    console.log("Ejecutando obtenerDatosAtraso...");

    const resultados = await Atraso.findAll({
      attributes: ['atraso_id', 'estado', 'hora'],
      include: [
        {
          model: Usuario,
          attributes: ['rut', 'nombre'],
          include: [
            {
              model: Curso,
              attributes: ['numero_curso'],
              include: [
                {
                  model: Imparte,
                  attributes: ['hora_inicio', 'hora_fin'],
                  include: [
                    {
                      model: Materia,
                      attributes: ['nombre_materia']
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    });

// Mapeo de resultados para asegurar que Materia esté presente
const datosAtraso = resultados.map((atraso) => {
  const usuario = atraso.Usuario;
  const curso = usuario.Curso;
  const imparte = curso?.Imparte || []; // Comprobamos que Imparte no sea undefined

  // Filtramos las materias que tienen un objeto Materia asociado y un nombre_materia definido
  const materias = imparte.filter((imp) => {
    // Comparar la hora del atraso con los rangos de hora inicio y hora fin
    const horaAtraso = atraso.hora;
    const horaInicio = imp.hora_inicio;
    const horaFin = imp.hora_fin;
    return horaAtraso >= horaInicio && horaAtraso <= horaFin && imp.Materia && imp.Materia.nombre_materia;
  }).map((imp) => imp.Materia);

  // Si materias está vacío, evitar el acceso a nombre_materia
  const nombresMaterias = materias.length > 0 ? materias.map(materia => materia.nombre_materia) : [];

  return {
    atraso_id: atraso.atraso_id,
    curso: curso.numero_curso,
    rut: usuario.rut,
    nombre: usuario.nombre,
    materias: nombresMaterias.length > 0 ? nombresMaterias : ['Sin materia'],
    estado: atraso.estado
  };
});

    console.log('Resultados:', datosAtraso);
    res.json(datosAtraso);
  } catch (error) {
    console.error('Error obteniendo datos de atrasos:', error);
    throw new Error('No se pudieron obtener los datos de atrasos');
  }
}

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
