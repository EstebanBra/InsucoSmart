import axios from './root.service.js';

export default async function marcarAtraso(rut) {
    try {
        const response = await axios.post('/atraso/obtener', { rut });
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al registrar atraso.');
    }
}