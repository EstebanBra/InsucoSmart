import Usuario from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export default async function crearAdministrador() {
    try {
        const usuario = await Usuario.findOne();
        if (usuario) return;

        const contrasena = await bcrypt.hash("admin", 10);

        const administrador = {
            rut: "99.999.999-9",
            rol: "Administrador",
            nombre: "admin",
            curso_id: null,
            contrasena: contrasena
        }

        await Usuario.create(administrador);
        console.log("* => Administrador creado exitosamente");
    } catch (error) {
        console.error("Error en initSetup.js -> crearAdministrador():", error);
    }
}
