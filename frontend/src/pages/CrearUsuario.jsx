import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearUsuarioAPI } from '../services/user.service.js';
import { Successful } from '../helpers/Notifications.jsx';
import Form from '../components/Form.jsx';
import NavBar from '../components/NavBar.jsx';
import formatoRUN from '../helpers/FormatoRUN.jsx';

//! Validar si el rol seleccionado aparezcan o desaparezcan campos
//* El campo de los cursos debe ser seleccionable
// Implementar un botón para ver la contraseña
//? Opcional: Darle formato al rut

export default function CrearUsuario() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [showNotification, setShowNotification] = useState(null);
    const [formData, setFormData] = useState({
        rol: '',
        rut: '',
        nombre: '',
        curso: '',
        contrasena: ''
    });

    async function createSubmit(data) {
        try {
            await crearUsuarioAPI(data);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                navigate('/');
            }, 2200);
        } catch (error) {
            setError(error.message);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        let formattedValue = value;

        if (name === 'rut') {
            formattedValue = formatoRUN(value);

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

    const isFormValid = (
        formData.rol.trim() !== '' &&
        formData.rut.trim() !== '' &&
        formData.nombre.trim() !== ''
    );

    return (
        <>
            {showNotification && <Successful message="¡Cuenta creada exitosamente!" />}
            <NavBar />
            <Form
                title="Crear usuario"
                fields={[
                    {
                        label: "Rol",
                        name: "rol",
                        options: ['Inspector','Profesor', 'Alumno'],
                        value: formData.rol,
                        onChange: handleChange
                    },
                    {
                        label: "RUN",
                        name: "rut",
                        type: "text",
                        value: formData.rut,
                        onChange: handleChange
                    },
                    {
                        label: "Nombre",
                        name: "nombre",
                        type: "text",
                        value: formData.nombre,
                        onChange: handleChange
                    },
                    {
                        label: "Curso",
                        name: "curso",
                        type: "text",
                        value: formData.curso,
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
                buttonText="Crear"
                onSubmit={createSubmit}
                buttonDisabled={!isFormValid}
                footerContent={error && <p>{error}</p>}
            />
        </>
    );
}