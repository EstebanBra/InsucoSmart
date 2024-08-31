import { DataTypes } from 'sequelize';
import sequelize from '../config/configDB.js';
import Usuario from '../models/user.model.js';

const Materia = sequelize.define('Materia', {
    materia_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_materia: {
      type: DataTypes.STRING,
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
    tableName: 'MATERIA',
    timestamps: false,
});

  Materia.belongsTo(Usuario, { foreignKey: 'rutpersona' });
  Usuario.hasOne(Materia, { foreignKey: 'rutpersona' });

export default Materia;