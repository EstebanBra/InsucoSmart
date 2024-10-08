import { DataTypes } from 'sequelize';
import sequelize from '../config/configDB.js';
import Atraso from '../models/atrasos.model.js';
import Usuario from '../models/user.model.js';

const Justificativo = sequelize.define('Justificativo', {
    justificativo_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    motivo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    archivo_url: {
        type: DataTypes.STRING
    },
    rutpersona: {
        type: DataTypes.STRING,
        references: {
          model: Usuario,
          key: 'rut'
        },
    },
    atraso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Atraso,
            key: 'atraso_id'
        }
    }
}, {
    tableName: 'JUSTIFICATIVO',
    timestamps: false,
});

Justificativo.belongsTo(Usuario, { foreignKey: 'rutpersona' });
Usuario.hasMany(Justificativo, { foreignKey: 'rutpersona' });

Justificativo.belongsTo(Atraso, { foreignKey: 'atraso_id' });
Atraso.hasOne(Justificativo, { foreignKey: 'atraso_id' });

export default Justificativo;