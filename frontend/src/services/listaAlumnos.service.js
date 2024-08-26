import axios from './root.service.js';

export async function ListaAlumnos() {
    try {
        const response = await axios.get('/atraso/alumnos');
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error en listar a los alumnos.');
    }
}

export async function AlumnosAlertaa() {
    try {
        const response = await axios.get('/atraso/alumnosAlerta');
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error en listar a los alumnos.');
    }
}
export async function getAtrasosAlumno() {
    try {
      const response = await axios.get('/atraso/atrasosAlumno');
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error en listar a los atrasos del alumno.');
    }
  }
