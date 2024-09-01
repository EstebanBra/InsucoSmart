import axios from './root.service.js';

export async function crearUsuarioAPI(data) {
    try {
        const response = await axios.post('/usuario/crear', data);
        return response.data.data;
    } catch(error) {
        throw new Error(error.response?.data?.message || 'Error al crear el usuario');
    }
}

export async function listarAcademicos() {
    try {
        const { data } = await axios.get('/usuario/listar/academicos');
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function eliminarPersonaAPI(rut) {
    try {
        const response = await axios.delete(`/usuario/eliminar/${rut}`);
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function editarPersonaAPI(rut, datos) {
    try {
        const response = await axios.patch(`/usuario/modificar/${rut}`, datos);
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}