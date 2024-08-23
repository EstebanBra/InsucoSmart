import bcrypt from 'bcryptjs';
import Usuario from '../models/user.model.js';

export async function crearUsuario(req, res) {
    try {
        const { rut, rol, nombre, curso, contrasena } = req.body;

        // Maneja posibles errores de campos requeridos
        if (!rut) {
            return res.status(400).json({ message: 'El parámetro "rut" es requerido.' });
        }
        if (!rol) {
            return res.status(400).json({ message: 'El parámetro "rol" es requerido.' });
        }
        if (!nombre) {
            return res.status(400).json({ message: 'El parámetro "nombre" es requerido.' });
        }

        // Verifica si el rut existe
        const rutEncontrado = await Usuario.findOne({ where: { rut } });
        if (rutEncontrado) {
            return res.status(400).json({ message: 'El rut ya se encuentra registrado.' });
        }

        // Asigna los datos
        const datosUsuario = { rut, rol, nombre, curso };

        // Encripta la contraseña
        if (contrasena) {
            datosUsuario.contrasena = await bcrypt.hash(contrasena, 10);
        }
        
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
            attributes: ['rol', 'rut', 'nombre', 'curso']
        });
        res.status(200).json({
            message: 'Académicos encontrados:',
            academicos: academicos
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
    if (!usuarioEncontrado) {
      return res.status(404).json({ message: `Usuario con RUT: ${rut} no encontrado` });
    }

    // Actualiza solo los campos que se desean modificar
    if (nombre) usuarioEncontrado.nombre = nombre;
    if (curso) usuarioEncontrado.curso = curso;
    if (rol) usuarioEncontrado.rol = rol;
    if (contrasena) {
        usuarioEncontrado.contrasena = await bcrypt.hash(contrasena, 10);
    }

    await usuarioEncontrado.save();

    res.status(200).json({
        message: 'Usuario con RUT: ${rut} modificado correctamente',
        usuario: usuarioEncontrado
    });

    } catch (error) {
        console.error('Error en user.controller.js -> modificarUsuario():',error);
        res.status(500).json({ message: error.message });
    }
}