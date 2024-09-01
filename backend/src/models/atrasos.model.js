import { DataTypes } from 'sequelize';
import sequelize from '../config/configDB.js';
import Usuario from '../models/user.model.js';
import Imparte from '../models/imparte.model.js';
import Materia from '../models/materia.model.js';
const Atraso = sequelize.define('Atraso', {
    atraso_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    estado: { //0 inactivo, 1 activo
      type: DataTypes.BOOLEAN,
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
        key: 'rut',
      },
    },
}, {
    tableName: 'ATRASO',
    timestamps: false,
    Imparte,
    Materia
});

  Atraso.belongsTo(Usuario, { foreignKey: 'rutpersona' });
  Usuario.hasMany(Atraso, { foreignKey: 'rutpersona' });
  
export default Atraso;