import { DataTypes } from 'sequelize';
import sequelize from '../config/configDB.js';
import Usuario from '../models/user.model.js';

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
    }
}, {
    tableName: 'justificativo',
    timestamps: false
});

Justificativo.belongsTo(Usuario, { foreignKey: 'rutpersona' });
Usuario.hasMany(Justificativo, { foreignKey: 'rutpersona' });

export default Justificativo;