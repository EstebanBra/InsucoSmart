import { DataTypes } from 'sequelize';
import sequelize from '../config/configDB.js';
import Justificativo from './justificativo.model.js';

const Atraso = sequelize.define('Atraso', {
    atraso_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rutpersona: {
        type: DataTypes.STRING(12),
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    idJustificativo: {
        type: DataTypes.INTEGER,
        references: {
            model: Justificativo,
            key: 'justificativo_id'
        },
        allowNull: true // Ya que un atraso puede no tener justificativo
    }
}, {
    tableName: 'atraso',
    timestamps: false
});

// Relaciones
Atraso.belongsTo(Justificativo, { foreignKey: 'idJustificativo' });
Justificativo.hasOne(Atraso, { foreignKey: 'idJustificativo' });

export default Atraso;