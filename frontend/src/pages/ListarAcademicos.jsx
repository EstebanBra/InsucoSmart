import React, { useState, useEffect } from 'react';
import { listarAcademicos, eliminarPersonaAPI, editarPersonaAPI } from '../services/user.service.js';
import NavBar from '../components/NavBar.jsx';
import '../styles/tabla.css';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';

export default function ListarAcademicos() {
    const [academicos, setAcademicos] = useState([]);
    const [error, setError] = useState(null);
    const [editData, setEditData] = useState(null);
    const [editMode, setEditMode] = useState(null);

    useEffect(() => {
        async function obtenerListaAcademicos() {
            try {
                const response = await listarAcademicos();
                setAcademicos(response.academicos);
            } catch (error) {
                setError(error);
            }
        }
        obtenerListaAcademicos();
    }, []);
    
    async function eliminarPersona(rut) {
        try {
            await eliminarPersonaAPI(rut);
            setAcademicos(academicos.filter(academico => academico.rut !== rut));
        } catch (error) {
            setError(error);
        }
    }

    function handleEditClick(academico) {
        setEditData({ ...academico });
        setEditMode(academico.rut);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]: value
        });
    }

    async function handleSave() {
        try {
            await editarPersonaAPI(editData.rut, editData);
            setAcademicos(academicos.map(academico =>
                academico.rut === editData.rut ? editData : academico
            ));
            setEditData(null);
            setEditMode(null);
        } catch (error) {
            setError(error);
        }
    }

    function handleCancel() {
        setEditData(null);
        setEditMode(null);
    }

    return (
        <>
            <NavBar />
            <div className="body-listaAlumnos">
                <div className="title-container">
                    <h1 className="title">Listado de académicos</h1>
                </div>
                <div className="container-listaAlumnos">
                    {error && <p>{error.message}</p>}
                    {academicos.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Rol</th>
                                    <th>RUN</th>
                                    <th>Nombre</th>
                                    <th>Curso</th>
                                    <th className="text-center">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {academicos.map((academico) => (
                                    <tr key={academico.rut}>
                                        <td>
                                            {editMode === academico.rut ? (
                                                <input
                                                    type="text"
                                                    name="rol"
                                                    value={editData.rol}
                                                    onChange={handleChange}
                                                />
                                            ) : (
                                                academico.rol
                                            )}
                                        </td>
                                        <td>
                                            {editMode === academico.rut ? (
                                                <input
                                                    type="text"
                                                    name="rut"
                                                    value={editData.rut}
                                                    disabled
                                                />
                                            ) : (
                                                academico.rut
                                            )}
                                        </td>
                                        <td>
                                            {editMode === academico.rut ? (
                                                <input
                                                    type="text"
                                                    name="nombre"
                                                    value={editData.nombre}
                                                    onChange={handleChange}
                                                />
                                            ) : (
                                                academico.nombre
                                            )}
                                        </td>
                                        <td>
                                            {editMode === academico.rut ? (
                                                <input
                                                    type="text"
                                                    name="curso"
                                                    value={editData.curso}
                                                    onChange={handleChange}
                                                />
                                            ) : (
                                                academico.curso
                                            )}
                                        </td>
                                        <td className="td-tabla">
                                            {editMode === academico.rut ? (
                                                <>
                                                    <button className="save-button" onClick={handleSave}>
                                                        Guardar
                                                    </button>
                                                    <button className="cancel-button" onClick={handleCancel}>
                                                        Cancelar
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className="tabla-button edit-button" onClick={() => handleEditClick(academico)}>
                                                        <img src={editIcon} alt="Edit" />
                                                    </button>
                                                    <button className="tabla-button delete-button" onClick={() => eliminarPersona(academico.rut)}>
                                                        <img src={deleteIcon} alt="Delete" />
                                                    </button>
                                                </>
                                            )}
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
