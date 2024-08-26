import { DataTypes } from 'sequelize';
import sequelize from '../config/configDB.js';
import Usuario from '../models/user.model.js';
import Atraso from '../models/atrasos.model.js';

const Justificativo = sequelize.define('Justificativo', {
    justificativo_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, // Define `id` como la clave primaria
    },
    rutpersona: {
        type: DataTypes.STRING(12),
        references: {
            model: Usuario,
            key: 'rut'
        }
    },
    motivo: {
        type: DataTypes.STRING,
    },
    estado: {
        type: DataTypes.STRING
    },
    archivo_url: {
        type: DataTypes.STRING
    },
    idatraso:{
        type: DataTypes.INTEGER,
        references: {
            model: Atraso,
            key: 'idatraso'
        }
    }
}, {
    tableName: 'justificativo',
    timestamps: false
});

Justificativo.belongsTo(Usuario, { foreignKey: 'rutpersona' });
Usuario.hasMany(Justificativo, { foreignKey: 'rutpersona' });

Justificativo.belongsTo(Atraso, { foreignKey: 'idatraso' }); // Agregar relación con Atraso
Atraso.hasMany(Justificativo, { foreignKey: 'idatraso' });

export default Justificativo;