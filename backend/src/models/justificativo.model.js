import { DataTypes } from 'sequelize';
import sequelize from '../config/configDB.js';
import Atraso from '../models/atrasos.model.js';
import Usuario from '../models/user.model.js';

const Justificativo = sequelize.define('Justificativo', {
    justificativo_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
    atraso_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Atraso,
            key: 'atraso_id'
        }
    }
}, {
    tableName: 'justificativo',
    timestamps: false
});

Justificativo.belongsTo(Usuario, { foreignKey: 'rutpersona' });
Usuario.hasMany(Justificativo, { foreignKey: 'rutpersona' });

Justificativo.belongsTo(Atraso, { foreignKey: 'atraso_id' });
Atraso.hasOne(Justificativo, { foreignKey: 'atraso_id' });

export default Justificativo;