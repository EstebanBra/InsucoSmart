import axios from './root.service.js';

export default async function loginAPI(data) {
    try {
        const response = await axios.post('/auth/login', data);
        const { status } = response;
        if (status === 200) {
            sessionStorage.setItem('usuario', JSON.stringify(response.data.data));
        }
        return response.data.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al intentar iniciar sesión.');
    }
}