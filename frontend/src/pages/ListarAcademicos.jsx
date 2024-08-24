// src/pages/ListarAcademicos.jsx
import React, { useState, useEffect } from 'react';
import { listarAcademicos } from '../services/user.service.js';
import { eliminarPersonaAPI } from '../services/user.service.js';
import NavBar from '../components/NavBar.jsx';
import '../styles/tabla.css';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';

export default function ListarAcademicos() {
    const [academicos, setAcademicos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        function obtenerListaAcademicos() {
            listarAcademicos()
                .then(response => {
                    setAcademicos(response.academicos);
                })
                .catch(error => {
                    setError(error);
                });
        }
        obtenerListaAcademicos();
    }, []);
    
    async function eliminarPersona(rut) {
        try {
            await eliminarPersonaAPI(rut);
            setAcademicos(academicos.filter(academico => academico.rut !== rut))
        } catch (error) {
            setError(error);
        }
    }

    return (
        <>
            <NavBar />
            <div className="body-listaAlumnos">
                <div className="title">
                    <h1>Listado de académicos</h1>
                </div>
                <div className="container-listaAlumnos">
                    {error && <o>{error}</o>}
                    {academicos.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Rol</th>
                                    <th>RUN</th>
                                    <th>Nombre</th>
                                    <th>Curso</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {academicos.map((academico) => (
                                    <tr key={academico.rut}>
                                        <td>{academico.rol}</td>
                                        <td>{academico.rut}</td>
                                        <td>{academico.nombre}</td>
                                        <td>{academico.curso}</td>
                                        <td className="td-tabla">
                                            <button className="tabla-button edit-button">
                                                <img src={editIcon}></img>
                                            </button>
                                            <button className="tabla-button delete-button" onClick={() => {eliminarPersona(academico.rut)}}>
                                                <img src={deleteIcon}></img>
                                            </button>
                                        </td>
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
