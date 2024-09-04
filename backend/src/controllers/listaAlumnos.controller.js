import Usuario from '../models/user.model.js';
import Atraso from '../models/atrasos.model.js';
import Curso from '../models/curso.model.js';
import Imparte from '../models/imparte.model.js';
import Materia from '../models/materia.model.js';
import Justificativo from '../models/justificativo.model.js';

import { Op } from 'sequelize';


export async function obtenerAlumnosConAtrasos(req, res) {
  try {

    const resultados = await Atraso.findAll({
      attributes: ['estado', 'hora', 'fecha', 'atraso_id'],
      where: {
        estado: true  // Filtra por estado igual a true
      },
      include: [
        {
          model: Usuario,
          attributes: ['rut', 'nombre'],
          include: [
            {
              model: Curso,
              attributes: ['numero_curso', 'curso_id'],
            },
          ],
        },
      ],
    });
    //console.log(resultados);

    const resultadosImparte = [];

    for (const resultado of resultados) {
        // Asegúrate de que estás accediendo correctamente a los datos anidados
      const usuario = resultado?.dataValues?.Usuario?.dataValues;
      const curso = usuario?.Curso?.dataValues;
      //console.log(usuario);
      //console.log(curso);

      const fecha = resultado.fecha;
      const horaAtraso =  resultado.hora;
      console.log(fecha);
      console.log(horaAtraso);

      //Cambiar la fecha a Dia de la semana
      const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const diaSemana = diasSemana[(new Date(fecha).getDay() + 1) % 7];
      console.log(diaSemana);

      const imparte = await Imparte.findOne({
        where: {
          curso_id: curso.curso_id,
          dia: diaSemana,
          [Op.and]: [
            {
              hora_inicio: {
                [Op.lte]: horaAtraso
              }
            },
            {
              hora_fin: {
                [Op.gte]: horaAtraso
              }
            }
          ]
        },
        attributes: ['materia_id', 'curso_id'] // Asegúrate de incluir curso_id en los atributos
      });

      const justificativo = await Justificativo.findOne({
        where: {atraso_id: resultado.atraso_id},
        attributes: ['estado']
       });

       let Justificado;
       if (!justificativo) {
         Justificado = 'no justificado';
       } else {
         Justificado = justificativo.estado;
       }


      if (imparte) {
        const materia = await Materia.findOne({
          where: {
            materia_id: imparte.materia_id
          },
          attributes: ['nombre_materia']
        });
    
        resultadosImparte.push({
          fechaAtraso: resultado.fecha,
          horaAtraso: resultado.hora,
          numeroCurso: resultado.Usuario.Curso.numero_curso,
          nombreMateria: materia.nombre_materia,
          rutUsuario: resultado.Usuario.rut,
          nombreUsuario: resultado.Usuario.nombre,
          justificado: Justificado

        });
      } else {
        resultadosImparte.push({
          fechaAtraso: resultado.fecha,
          horaAtraso: resultado.hora,
          estado: resultado.estado,
          nombreMateria: null,
          rutUsuario: resultado.Usuario.rut,
          nombreUsuario: resultado.Usuario.nombre,
          numeroCurso: resultado.Usuario.Curso.numero_curso,
          justificado: Justificado

        });
      }
    }
    res.json(resultadosImparte);

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
