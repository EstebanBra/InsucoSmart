import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../services/auth.service';
import { Successful } from '../helpers/Notifications.jsx';
import NavBar from '../components/NavBar.jsx';
import Form from '../components/Form.jsx';

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [formData, setFormData] = useState({ rut: '', contrasena: '' });
    const [notificationMessage, setNotificationMessage] = useState('');
    async function loginSubmit(data) {
        try {
            const response = await loginAPI(data);
            setShowNotification(true);
            setNotificationMessage('¡Inicio de sesión exitoso!');
            setTimeout(() => {
                setShowNotification(false);
                if (response.rol === 'Administrador') {
                    navigate('/');
                }
                if (response.rol === 'Profesor') {
                    navigate('/ProfesorPage');
                }
                if (response.rol === 'Alumno') {
                    navigate('/AlumnoPage');
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
            <NavBar />
            {showNotification && <Successful message={notificationMessage} />}
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
                footerContent={error && <p>{error}</p>}
            />
        </main>
    );
}
