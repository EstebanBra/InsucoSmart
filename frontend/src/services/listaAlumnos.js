import axios from './root.service.js';

export default async function ListaAlumnos() {
    try {
        const response = await axios.get('/atraso/alumnos');
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error en listar a los alumnos.');
    }
}