import { DataTypes } from 'sequelize';
import sequelize from '../config/configDB.js';
import Usuario from '../models/user.model.js';

const Justificativo = sequelize.define('Justificactivo', {
    rutpersona: {
        type: DataTypes.STRING(12),
        primaryKey: true,
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
    }
},{
    tableName: 'justificativo',
    timestamps: false
});

Justificativo.belongsTo(Usuario, { foreignKey: 'rutpersona' });
Usuario.hasMany(Justificativo, { foreignKey: 'rutpersona' });

export default Justificativo;
