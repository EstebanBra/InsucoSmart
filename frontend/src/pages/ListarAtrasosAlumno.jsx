import { useState, useEffect } from 'react';
import axios from '../services/root.service.js';
import { getAtrasosAlumno } from '../services/listaAlumnos.service.js';
import Tabla from '../components/Tabla.jsx';
import NavBar from '../components/NavBar.jsx';
import '../styles/tabla.css';

function AtrasosAlumno() {
  const [atrasos, setAtrasos] = useState([]);
  const [error, setError] = useState(null);
  const [rutAlumno, setRutAlumno] = useState('');

  useEffect(() => {
    const obtenerRutAlumno = async () => {
      try {
        const response = await axios.get('/atraso/rutAlumno'); // Llama a tu ruta del backend
        console.log('RUT recibido del backend:', response.data.rut);
        setRutAlumno(response.data.rut);
      } catch (error) {
        setError(error);
      }
    };
    obtenerRutAlumno();
  }, []);

  useEffect(() => {
    if (rutAlumno) {
      const obtenerAtrasosAlumno = async () => {
        try {
          const response = await getAtrasosAlumno(rutAlumno);
          setAtrasos(response.data);
        } catch (error) {
          setError(error);
        }
      };
      obtenerAtrasosAlumno();
    }
  }, [rutAlumno]);

  const columnas = ['fecha','hora'];
  const titulos = ['Fecha','Hora'];

  return (
    <div className="body-listaAlumnos">
      <NavBar />
      <div className="title">
        <h1>Atrasos de {rutAlumno}</h1>
      </div>
      <div className="container-atrasosAlumno">
        {atrasos.length > 0 ? (
          <Tabla datos={atrasos} columnas={columnas} titulos={titulos} />
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
