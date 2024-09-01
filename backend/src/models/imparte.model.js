import { DataTypes } from 'sequelize';
import sequelize from '../config/configDB.js';
import Materia from '../models/materia.model.js';
import Curso from '../models/curso.model.js';

const Imparte = sequelize.define('Imparte', {
    materia_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Materia,
        key: 'materia_id'
      },
    },
    curso_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Curso,
        key: 'curso_id'
      },
    },
    dia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false,
     },
    hora_fin: {
        type: DataTypes.TIME,
        allowNull: false,
    },
}, {
    tableName: 'IMPARTE',
    timestamps: false,
});

Imparte.belongsTo(Materia, { foreignKey: 'materia_id' });
Materia.hasMany(Imparte, { foreignKey: 'materia_id' });

Imparte.belongsTo(Curso, { foreignKey: 'curso_id' });
Curso.hasMany(Imparte, { foreignKey: 'curso_id' });

export default Imparte;

