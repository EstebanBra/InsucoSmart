import { DataTypes } from 'sequelize';
import sequelize from '../config/configDB.js';
import Curso from '../models/curso.model.js';

const Usuario = sequelize.define('Usuario', {
    rut: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    curso_id: {
        type: DataTypes.INTEGER,
        allowNull: true,  //lo deja opcion para por ejemplo Administrador que no tiene curso
        references: {
          model: Curso,
          key: 'curso_id',
        },
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: "PERSONA",
    timestamps: false, 
});
    Usuario.belongsTo(Curso, { foreignKey: 'curso_id' });
    Curso.hasMany(Usuario, { foreignKey: 'curso_id' });

export default Usuario;