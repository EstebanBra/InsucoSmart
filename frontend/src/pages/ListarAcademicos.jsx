// src/pages/ListarAcademicos.jsx
import React, { useState, useEffect } from 'react';
import { listarAcademicos } from '../services/user.service.js';
import NavBar from '../components/NavBar.jsx';
import '../styles/tabla.css'; // Asegúrate de que esta ruta es correcta

export default function ListarAcademicos() {
    const [academicos, setAcademicos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        function obtenerListaAcademicos() {
            listarAcademicos()
                .then(response => {
                    console.dir(response.academicos);
                    setAcademicos(response.academicos);
                })
                .catch(error => {
                    setError(error);
                });
        }
        obtenerListaAcademicos();
    }, []);

    return (
        <>
            <NavBar />
            <div className="body-listaAlumnos">
                <div className="title">
                    <h1>Listado de académicos</h1>
                </div>
                <div className="container-listaAlumnos">
                    {error ? (
                        <p>Error: {error.message}</p>
                    ) : academicos.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Rol</th>
                                    <th>RUN</th>
                                    <th>Nombre</th>
                                    <th>Curso</th>
                                </tr>
                            </thead>
                            <tbody>
                                {academicos.map((academico) => (
                                    <tr key={academico.rut}>
                                        <td>{academico.rol}</td>
                                        <td>{academico.rut}</td>
                                        <td>{academico.nombre}</td>
                                        <td>{academico.curso}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No se encontraron académicos.</p>
                    )}
                </div>
            </div>
        </>
    );
}
