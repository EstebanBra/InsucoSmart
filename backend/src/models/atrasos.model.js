import { DataTypes } from 'sequelize';
import sequelize from '../config/configDB.js';
import Usuario from '../models/user.model.js';

const Atraso = sequelize.define('Atraso', {
    atraso_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    hora: {
      type: DataTypes.TIME,
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
    rutpersona: {
      type: DataTypes.STRING,
      references: {
        model: Usuario,
        key: 'rut'
      },
    },
}, {
    tableName: 'ATRASO',
    timestamps: false,
});

  Atraso.belongsTo(Usuario, { foreignKey: 'rutpersona' });
  Usuario.hasMany(Atraso, { foreignKey: 'rutpersona' });
  
export default Atraso;