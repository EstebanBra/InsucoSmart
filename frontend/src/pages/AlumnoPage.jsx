import React from 'react';
import NavBar from '../components/NavBar.jsx';
import '../styles/tabla2.css'; // Incluye este archivo si necesitas estilos adicionales
import actividadImagen from '../assets/ponping.jpeg'; // Ruta al archivo .jpeg
import actividadImagen2 from '../assets/musicaTaller.jpeg'; // Ruta al archivo .jpeg


function AlumnoPage() {
    return (
        <div className="alumnoPage">
            <NavBar />
            <div className="bienvenido-alumno">
                <h1>Bienvenido, Alumno</h1>
            </div>
            <div className="info-section">
                <h2>Torneo de Ping Pong!!</h2>
                <img src={actividadImagen} alt="Evento 1" className="info-image" />
                <p className="info-text">
                    Te invitamos a nuestro emocionante Torneo de Ping Pong! 🏓 Únete a nosotros el Martes 10 de Septiembre a las 14:00hrs en el patio. Será una excelente oportunidad para mostrar tus habilidades y disfrutar de un día lleno de diversión y competencia amistosa.
                </p>
                <hr className="divider" />
            </div>
            <div className="info-section">
                <h2>Inscripciones Abiertas</h2>
                <img src={actividadImagen2} alt="Actividad 1" className="info-image" />
                <p className="info-text">
                Únete a nuestro Taller de Música! 🎶

Explora tu pasión por la música y mejora tus habilidades con nuestros talleres semanales. Las clases se imparten los martes y jueves de 17:00 a 19:00 horas, y los sábados de 10:00 a 12:00 horas. No importa tu nivel de experiencia, todos son bienvenidos.
¡Inscríbete hoy y forma parte de nuestra comunidad musical!                </p>
                <hr className="divider" />
            </div>
        </div>
    );
}

export default AlumnoPage;