import React, { useState, useEffect } from 'react';
import { ListaAlumnos } from '../services/listaAlumnos.service.js';
import '../styles/tabla.css'
import NavBar from '../components/NavBar.jsx';
import Tabla from '../components/Tabla.jsx'

function ListarAlumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerListaAlumnos = async () => {
      try {
        const response = await ListaAlumnos();
        const alumnosConCheckbox = response.data.map(alumno => ({ ...alumno, Seleccionar: <input type="checkbox" /> }));
        setAlumnos(alumnosConCheckbox);
      } catch (error) {
        setError(error);
      }
    };
    obtenerListaAlumnos();
  }, []);

  const columnas = ['nombre', 'rut', 'curso', 'totalatrasos', 'Seleccionar'];
  const titulos = ['Nombre', 'RUN', 'Curso', 'Total atrasos', ''];

  return (
    <div className="body-listaAlumnos">
      <NavBar />
      <div className="title">
        <h1>Atrasos de los Alumnos</h1>
      </div>
      {alumnos.length > 0 ? (
        <Tabla datos={alumnos} columnas={columnas} titulos={titulos} />
      ) : (
        error ? (
          <p>Error: {error.message}</p>
        ) : (
          <p>No se encontraron alumnos con atrasos.</p>
        )
      )}
    </div>
  );
}

export default ListarAlumnos;