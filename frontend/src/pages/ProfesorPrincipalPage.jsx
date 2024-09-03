import React from 'react';
import NavBar from '../components/NavBar.jsx';
import '../styles/tabla2.css'; // Incluye este archivo si necesitas estilos adicionales
import actividadImagen from '../assets/feria.png'; // Ruta al archivo .jpeg


function profesorPage() {
    return (
        <div className="alumnoPage">
            <NavBar />
            <div className="bienvenido-alumno">
                <h1>Bienvenido, Profesor</h1>
            </div>
            <div className="info-section">
                <h2>Recordatorio</h2>
                <img src={actividadImagen} alt="Evento 1" className="info-image" />
                <p className="info-text">
                No olviden que la Feria de Ciencias se llevará a cabo el viernes 22 de septiembre a partir de las 9:00 hrs. Los profesores de ciencias deben preparar sus stands y coordinar con los alumnos participantes.
                </p>
                <hr className="divider" />
            </div>
        </div>
    );
}

export default profesorPage;