import { DataTypes } from 'sequelize';
import sequelize from '../config/configDB.js';

const Curso = sequelize.define('Curso', {
    curso_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    numero_curso:{
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
      tableName: 'CURSO',
      timestamps: false,
});


export default Curso;   