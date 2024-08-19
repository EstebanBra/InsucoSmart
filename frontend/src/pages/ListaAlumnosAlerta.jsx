import React, { useState, useEffect } from 'react';
import { AlumnosAlertaa } from '../services/listaAlumnos.service.js';
import '../styles/tabla.css'
import NavBar from '../components/NavBar.jsx';

function ListarAlumnosAlerta() {
  const [alumnos, setAlumnos] = useState([]);
  const [error, setError] = useState(null);

  //useEffect para obtener la lista de alumnos
  useEffect(() => {
    const obtenerListaAlumnos = async () => {
      try {
        const response = await AlumnosAlertaa();
        setAlumnos(response.data);
      } catch (error) {
        setError(error);
      }
    };
    obtenerListaAlumnos();
  }, []);
  return (
    <div className="body-listaAlumnos">
      <NavBar />
      <div className="title">
        <h1>Lista de Alumnos con alerta</h1>
      </div>
      <div className= 'container-listaAlumnos'>
        {alumnos.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>RUT</th>
                <th>Curso</th>
                <th>Atrasos</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno) => (
                <tr key={alumno.rut}>
                    <td>{alumno.nombre}</td>
                    <td>{alumno.rut}</td>
                    <td>{alumno.curso}</td>
                    <td>{alumno.totalatrasos}</td>
                    <td><input type="checkbox" /></td>
                </tr>
              ))}

            </tbody>
          </table>
        ) : (
          error ? (
            <p>Error: {error.message}</p>
          ) : (
            <p>No se encontraron alumnos con atrasos.</p>
          )
        )}
      </div>
    </div>
  );
}

export default ListarAlumnosAlerta;