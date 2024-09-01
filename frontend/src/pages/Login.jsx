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

    // Función para formatear el RUN
    function formatoRut(texto) {
        // Elimina cualquier carácter que no sea un dígito o 'k/K'
        let rutAux = texto.replace(/[^0-9kK]/g, '').toUpperCase();

        if (rutAux.length <= 1) return rutAux; // No formatear si el RUN es demasiado corto

        // Asegurarse de que solo haya un dígito verificador al final
        let cuerpo = rutAux.slice(0, -1); // Parte numérica del RUN
        let dv = rutAux.slice(-1); // Dígito verificador

        // Limitar el cuerpo del RUN a un máximo de 8 caracteres
        if (cuerpo.length > 8) {
            cuerpo = cuerpo.slice(0, 8);
        }

        // Formatear el cuerpo del RUN con puntos
        let rutFormatted = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        return `${rutFormatted}-${dv}`;
    }

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
        let formattedValue = value;

        if (name === 'rut') {
            formattedValue = formatoRut(value);

            // Limita la longitud total a "XX.XXX.XXX-X" (12 caracteres)
            if (formattedValue.length > 12) {
                formattedValue = formattedValue.slice(0, 12);
            }
        }

        setFormData(prevData => ({
            ...prevData,
            [name]: formattedValue
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
                        onChange: handleChange,
                        maxLength: 12 // Limita el número máximo de caracteres a 12
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
