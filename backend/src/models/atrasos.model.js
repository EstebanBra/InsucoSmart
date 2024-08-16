// models/atraso.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/configDB.js';
import Persona from '../models/persona.model.js';

const Atraso = sequelize.define('Atraso', {
    idAtraso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: {
      type: DataTypes.STRING
    },
    totalAtrasos: {
      type: DataTypes.INTEGER
    },
    rutPersona: {
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
  
  Atraso.belongsTo(Persona, { foreignKey: 'rutPersona' });
  Persona.hasMany(Atraso, { foreignKey: 'rutPersona' });
  
  export default Atraso ;