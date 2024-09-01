import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profesorPage.css';  // Asegúrate de crear y estilizar este archivo CSS' ../styles/tabla.css'
import NavBar from '../components/NavBar.jsx';

function AlumnoPage() {
    const navigate = useNavigate();

    const handleListarAtrasos = () => {
        navigate('/listaAtrasos'); // Ruta que lleva a la lista de alumnos
    };
    const handleIngresarJustificativo = () => {
        navigate('/ingresarJustificativo'); // Ruta que lleva a la lista de alumnos
    };


    return (
        <div className="profesorPage">
        <NavBar />
            <div className="bienvenido-profesor">
                <h1> Bienvenido, Alumno </h1>
            </div>
            <div className="button-container">
                <button className="styled-button" onClick={handleListarAtrasos}>Ver atrasos</button>
                <button className="styled-button" onClick={handleIngresarJustificativo}>Justificar Atraso</button>

            </div>
        </div>
    );
}

export default AlumnoPage;