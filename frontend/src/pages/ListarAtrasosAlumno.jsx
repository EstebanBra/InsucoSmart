import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAtrasosAlumno } from '../services/listaAlumnos.service.js';
import Tabla from '../components/Tabla.jsx';
import NavBar from '../components/NavBar.jsx';
import '../styles/tabla.css';

function AtrasosAlumno() {
  const [atrasos, setAtrasos] = useState([]);
  const [error, setError] = useState(null);
  const [rutAlumno, setRutAlumno] = useState('');
  const [rutAlumnoLoaded, setRutAlumnoLoaded] = useState(false);

  useEffect(() => {
    const obtenerRutAlumno = async () => {
      try {
        const response = await axios.get('/rutAlumno');
        setRutAlumno(response.data.rutAlumno);
        setRutAlumnoLoaded(true);
        console.log('RUT del alumno:', response.data.rutAlumno);
      } catch (error) {
        setError(error);
      }
    };
    obtenerRutAlumno();
  }, []);

  useEffect(() => {
    if (rutAlumnoLoaded) {
      const obtenerAtrasosAlumno = async () => {
        try {
          console.log('RUT del alumno antes de llamar a getAtrasosAlumno:', rutAlumno);
          const response = await getAtrasosAlumno(rutAlumno);
          setAtrasos(response.data);
        } catch (error) {
          setError(error);
        }
      };
      obtenerAtrasosAlumno();
    }
  }, [rutAlumnoLoaded]);

  const columnas = ['fecha', 'atraso'];

  return (
    <div className="body-listaAlumnos">
      <NavBar />
      <div className="title">
        <h1>Atrasos de {rutAlumno}</h1>
      </div>
      <div className="container-atrasosAlumno">
        {atrasos.length > 0 ? (
          <Tabla datos={atrasos} columnas={columnas} />
        ) : (
          error ? (
            <p>Error: {error.message}</p>
          ) : (
            <p>No se encontraron atrasos para este alumno.</p>
          )
        )}
      </div>
    </div>
  );
}

export default AtrasosAlumno;