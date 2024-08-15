import pool from '../config/configdb.js';

export const obtenerAlumnoPorRut = async (req, res) => {
  const { rut } = req.params;
  try {
    const result = await pool.query('SELECT * FROM alumnos WHERE rut = $1', [rut]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Alumno no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el alumno' });
  }
};
