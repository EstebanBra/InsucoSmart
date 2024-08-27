import axios from './root.service.js';


const API_URL = '/api/atraso';

export const uploadJustificativo = async (formData) => {
    try {
        const response = await axios.post(`/atraso/upload-justificativo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Necesario para enviar archivos
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al subir el justificativo:', error);
        throw error.response ? error.response.data : new Error('Error desconocido');
    }
};
