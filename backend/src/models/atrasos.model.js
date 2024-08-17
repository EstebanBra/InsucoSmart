// models/atraso.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/configDB.js';
import Persona from '../models/persona.model.js';

const Atraso = sequelize.define('Atraso', {
    idatraso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: {
      type: DataTypes.STRING
    },
    totalatrasos: {
      type: DataTypes.INTEGER
    },
    rutpersona: {
      type: DataTypes.STRING,
      references: {
        model: Persona,
        key: 'rut'
      }
    }
  }, {
    tableName: 'atraso',
    timestamps: false
  });
  
  Atraso.belongsTo(Persona, { foreignKey: 'rutpersona' });
  Persona.hasMany(Atraso, { foreignKey: 'rutpersona' });
  
  export default Atraso ;