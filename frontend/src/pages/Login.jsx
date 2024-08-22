import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../services/auth.service';
import Form from '../components/Form.jsx';
import { SesionExitosa } from '../helpers/Notifications.jsx';

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [formData, setFormData] = useState({ rut: '', contrasena: '' });

    async function loginSubmit(data) {
        try {
            const response = await loginAPI(data);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                if (response.rol === 'Administrador') {
                    navigate('/');
                }
                if (response.rol === 'Profesor') {
                    navigate('/ProfesorPage');
                }
            }, 2200);
        } catch (e) {
            setError(e.message);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const isFormValid = formData.rut.trim() !== '' && formData.contrasena.trim() !== '';

    return (
        <main>
            {error && <p>{error}</p>}
            {showNotification && <SesionExitosa />}
            <Form
                title='Bienvenido'
                fields={[
                    {
                        label: "RUN",
                        name: "rut",
                        type: "text",
                        value: formData.rut,
                        onChange: handleChange
                    },
                    {
                        label: "Contraseña",
                        name: "contrasena",
                        type: "password",
                        value: formData.contrasena,
                        onChange: handleChange
                    }
                ]}
                buttonText="Iniciar sesión"
                onSubmit={loginSubmit}
                buttonDisabled={!isFormValid}
            />
        </main>
    );
}
