import { DataTypes } from 'sequelize';
import Sequelize from '../config/configDB.js';

const Persona = Sequelize.define('Persona', {
  rut: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'persona',
  timestamps: false // Evita tener: createdAt y updatedAt
});

export default Persona;