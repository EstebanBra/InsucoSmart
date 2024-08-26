// models/atraso.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/configDB.js';
import Usuario from '../models/user.model.js';

const Atraso = sequelize.define('Atraso', {
    idatraso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: {
      type: DataTypes.STRING
    },
    atraso: {
      type: DataTypes.INTEGER
    },
    rutpersona: {
      type: DataTypes.STRING,
      references: {
        model: Usuario,
        key: 'rut'
      }
    },
    fecha:{
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'atraso',
    timestamps: false
  });
  
  Atraso.belongsTo(Usuario, { foreignKey: 'rutpersona' });
  Usuario.hasMany(Atraso, { foreignKey: 'rutpersona' });
  
  export default Atraso ;