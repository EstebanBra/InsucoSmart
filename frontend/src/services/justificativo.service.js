import axios from './root.service.js';

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
export async function getDatosJustificativo(atraso_id) {
    try {
      const response = await axios.get(`/atraso/justificativo/${atraso_id}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error en listar a los atrasos del alumno.');
    }
  }
  export async function aprobarJustificativo(atraso_id) {
    try {
      const response = await axios.patch(`/atraso/aceptar/${atraso_id}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al aprobar el justificativo.');
    }
  }
  export async function rechazarJustificativo(atraso_id) {
    try {
      const response = await axios.patch(`/atraso/rechazar/${atraso_id}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al aprobar el justificativo.');
    }
  }
