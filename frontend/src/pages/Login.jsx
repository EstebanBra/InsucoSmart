import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginAPI from '../services/auth.service';
import Form from '../components/Form.jsx';
import { SesionExitosa } from '../helpers/Notifications.jsx';

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [showNotification, setShowNotification] = useState(false);

    async function loginSubmit(data) {
        try {
            await loginAPI(data);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                navigate('/');
            }, 2200);
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <main>
            {error && <p>{error}</p>}
            {showNotification && <SesionExitosa />}
            <Form
                title='Iniciar sesión'
                fields={[
                    {
                        label: "RUN",
                        name: "rut",
                        type: "text",
                    },
                    {
                        label: "Contraseña",
                        name: "contrasena",
                        type: "password",
                    }
                ]}
                buttonText="Iniciar sesión"
                onSubmit={loginSubmit}
            />
        </main>
    );
}
