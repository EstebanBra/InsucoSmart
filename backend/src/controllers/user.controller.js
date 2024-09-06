import bcrypt from 'bcryptjs';
import Usuario from '../models/user.model.js';
import Atraso from '../models/atrasos.model.js';
import Curso from '../models/curso.model.js';

export async function crearUsuario(req, res) {
    try {
        const { rut, rol, nombre, curso, contrasena } = req.body;
        console.log(curso);
        // Maneja posibles errores de campos requeridos
        if (!rut) return res.status(400).json({ message: 'El parámetro "rut" es requerido.' });
        if (!rol) return res.status(400).json({ message: 'El parámetro "rol" es requerido.' });
        if (!nombre) return res.status(400).json({ message: 'El parámetro "nombre" es requerido.' });

        // Verifica si el rut existe
        const rutEncontrado = await Usuario.findOne({ where: { rut } });
        if (rutEncontrado) return res.status(400).json({ message: 'El rut ya se encuentra registrado.' });

        let datosUsuario = { rut, rol, nombre };
        let curso_id;

        if(curso === 'No aplica'){
            datosUsuario.curso_id = null 
        } else {
            //consulta para obtener el curso_id del Numero de curso ingresado 
            curso_id = await Curso.findOne({
                where: {
                numero_curso:  curso 
                },
                attributes: ['curso_id'] // Selecciona solo el campo 'curso_id'
            });    
            datosUsuario.curso_id = curso_id.dataValues.curso_id;
        }
        

        // Encripta la contraseña
        if (contrasena) datosUsuario.contrasena = await bcrypt.hash(contrasena, 10);
        
        // Crea el usuario en base al modelo respectivamente
        const usuario = await Usuario.create(datosUsuario);

        // Envía una respuesta con el usuario creado
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            usuario
        });
    } catch (error) {
        console.error('Error en user.controller.js -> crearUsuario():', error);
        res.status(500).json({ message: error.message });
    }
}
export async function eliminarUsuario(req, res) {
    try {
        const { rut } = req.params;
        await Atraso.destroy({ where: { rutpersona: rut } });
        const usuarioEliminado = await Usuario.destroy({ where: { rut } });

        if (usuarioEliminado) {
            res.status(200).json({ message: `Usuario con RUT: ${rut} eliminado correctamente` });
        } else {
            res.status(404).json({ message: `Usuario con RUT: ${rut} no encontrado` });
        }
    } catch (error) {
        console.error('Error en user.controller.js -> eliminarUsuario():', error);
        res.status(500).json({ message: error.message });
    }
}
export async function listarAcademicos(req, res) {
    try {
        const academicos = await Usuario.findAll({
            where: { rol: ['Profesor', 'Inspector'] },
            attributes: ['rol', 'rut', 'nombre', 'curso_id']
        });
        // Iterar sobre cada académico para buscar su nombre de curso
        const academicosConCurso = await Promise.all(
            academicos.map(async (academico) => {
                // Consultar el nombre del curso según el curso_id del académico
                const curso = await Curso.findOne({
                    where: { curso_id: academico.curso_id },
                    attributes: ['numero_curso']
                });
                return {
                    rol: academico.rol,
                    rut: academico.rut,
                    nombre: academico.nombre,
                    curso: curso ? curso.numero_curso : 'Sin curso asignado' // Manejo si no hay curso encontrado
                };
            })
        );

        res.status(200).json({
            message: 'Académicos encontrados:',
            academicos: academicosConCurso
        });
    } catch (error) {
        console.error('Error en user.controller.js -> listarAcademicos():', error);
        res.status(500).json({ message: error.message });
    }
}

export async function modificarUsuario(req, res){
    try {
        const { rut } = req.params;
        const { nombre, curso, rol, contrasena } = req.body;

        // Verifica si el usuario existe
        const usuarioEncontrado = await Usuario.findOne({ where: { rut } });
        if (!usuarioEncontrado) return res.status(404).json({ message: `Usuario con RUT: ${rut} no encontrado` });

        // Actualiza solo los campos que se desean modificar
        if (nombre) usuarioEncontrado.nombre = nombre;
        if (curso) usuarioEncontrado.curso = curso;
        if (rol) usuarioEncontrado.rol = rol;
        if (contrasena) usuarioEncontrado.contrasena = await bcrypt.hash(contrasena, 10);

        await usuarioEncontrado.save();

        res.status(200).json({
            message: `Usuario con RUT: ${rut} modificado correctamente`,
            usuario: usuarioEncontrado
        });

    } catch (error) {
        console.error('Error en user.controller.js -> modificarUsuario():',error);
        res.status(500).json({ message: error.message });
    }
}