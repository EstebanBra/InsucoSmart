import bcrypt from 'bcryptjs';
import Usuario from '../models/user.model.js';

export const crearUsuario = async (req, res) => {
    const { rut, rol, nombre, curso, contrasena } = req.body;
    const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);
    try {
        const usuario = await Usuario.create({
            rut,
            rol,
            nombre,
            curso,
            contrasena: contrasenaEncriptada
        });
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            usuario: usuario.rows[0]
        });
    } catch (error) {
        console.log('Error en user.controller.js -> crearUsuario(): ', error);
        res.status(500).json({ message: error.message });
    }
}