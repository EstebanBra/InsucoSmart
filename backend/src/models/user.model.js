import { DataTypes } from 'sequelize';
import sequelize from '../config/configDB.js';

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
    curso: {
        type: DataTypes.STRING,
        allowNull: true
    },
    contrasena: {
    type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: "PERSONA",
    timestamps: false // Evita tener: createdAt y updatedAt
});

export default Usuario;