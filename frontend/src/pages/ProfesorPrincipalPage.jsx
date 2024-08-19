import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profesorPage.css';  // Asegúrate de crear y estilizar este archivo CSS' ../styles/tabla.css'
import NavBar from '../components/NavBar.jsx';

function ProfesorPage() {
    const navigate = useNavigate();

    const handleListarAlumnos = () => {
        navigate('/lista'); // Ruta que lleva a la lista de alumnos
    };

    const handleOtraAccion = () => {
        navigate('/otra-accion'); // Otra ruta o acción
    };

    return (
        <div className="profesorPage">
        <NavBar />
            <div className="bienvenido-profesor">
                <h1> Bienvenido, Profesor </h1>
            </div>
            <div className="button-container">
                <button className="styled-button" onClick={handleListarAlumnos}>Listar Alumnos</button>
                <button className="styled-button" onClick={handleOtraAccion}>Otra Acción</button>
            </div>
        </div>
    );
}

export default ProfesorPage;