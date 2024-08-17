import Usuarios from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export async function iniciarSesion(req, res) {
    try {
        const { rut, contrasena } = req.body;

        const usuarioEncontrado = await Usuarios.findOne({ where: { rut: rut }});
        if (!usuarioEncontrado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const rolesPermitidos = ['Administrador', 'Profesor'];
        if (!rolesPermitidos.includes(usuarioEncontrado.rol)) {
            return res.status(403).json({ message: 'No tienes permitido acceder aqui' });
        }

        const contrasenaValida = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);
        if (contrasenaValida) {
            req.session.usuario = {
                rut: usuarioEncontrado.rut,
                rol: usuarioEncontrado.rol,
                nombre: usuarioEncontrado.nombre,
                curso: usuarioEncontrado.curso,
            };
            res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } else {
            res.status(401).json({ message: 'Contraseña incorrecta' });
        }
    } catch (error) {
        console.error('Error en auth.controller.js -> iniciarSesion():', error);
        res.status(500).json({ message: error });
    }
}