import React, { useState, useEffect } from 'react';
import { aprobarJustificativo, rechazarJustificativo, getDatosJustificativo } from '../services/justificativo.service.js';
import '../styles/tabla.css'
import NavBar from '../components/NavBar.jsx';
import Form from '../components/Form.jsx'; // Importa el componente Form
import { useNavigate } from 'react-router-dom';

function AprobarJustificativo() {
  const navigate = useNavigate();
  const [datosJustificativo, setDatosJustificativo] = useState(null); // Esperamos un solo objeto, no una lista
  const [error, setError] = useState(null);
  const [atraso_id, setAtrasoId] = useState('');

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await getDatosJustificativo(atraso_id);
        setDatosJustificativo(response.data); // Asignamos directamente la respuesta
        console.log(response);
        console.log(atraso_id);
      } catch (error) {
        setError(error);
      }
    };

    if (atraso_id) {
      obtenerDatos();
    }
  }, [atraso_id]);

  const fields = [
    {
      label: 'Fecha',
      name: 'fecha',
      value: datosJustificativo ? datosJustificativo.atraso.fecha : '',
      disabled: true, 
    },
    {
      label: 'Hora',
      name: 'hora',
      value: datosJustificativo ? datosJustificativo.atraso.hora : '',
      disabled: true, 
    },
    {
      label: 'Nombre',
      name: 'nombre',
      value: datosJustificativo ? datosJustificativo.atraso.alumno.nombre : '',
      disabled: true, 
    },
    {
      label: 'RUT Persona',
      name: 'rutpersona',
      value: datosJustificativo ? datosJustificativo.atraso.rutpersona : '',
      disabled: true, 
    },
    {
      label: 'Curso',
      name: 'curso',
      value: datosJustificativo ? datosJustificativo.atraso.alumno.curso : '',
      disabled: true, 
    },
    {
      label: 'Motivo',
      name: 'motivo',
      value: datosJustificativo ? datosJustificativo.motivo : '',
      disabled: true, // Deshabilitamos el campo
    },
    {
      label: 'Justificativo',
      name: 'archivo_url',
      value: datosJustificativo ? datosJustificativo.archivo_url : '',
      type: 'url',
      disabled: true, // Deshabilitamos el campo
    },
  ];

  async function aceptarJustificativo() {
    await aprobarJustificativo(atraso_id);
    setTimeout(() => {
      navigate('/');
    }, 1600);
  }
  async function noAceptaJustificativo() {
    await rechazarJustificativo(atraso_id);
    setTimeout(() => {
      navigate('/');
    }, 1600);
  }

  return (
    <div className="body-listaAlumnos">
      <NavBar />
      <div className="title">
        <h1>Aprobar Justificativo</h1>
      </div>
      <div className="container-atrasosAlumno">
        <input 
          type="text" 
          value={atraso_id} 
          onChange={(event) => setAtrasoId(event.target.value)} 
          placeholder="Ingrese el ID del atraso" 
        />
        {datosJustificativo ? (
          <Form 
            title="Aprobar Justificativo"
            fields={fields}
            onSubmit={aceptarJustificativo}
            footer
          />
        ) : (
          error ? (
            <p>Error: {error.message}</p>
          ) : (
            <p>No se encontraron datos del justificativo.</p>
          )
        )}
        <div className="botones-accion">
          <button className="aceptar" onClick={aceptarJustificativo}>Aceptar</button>  
          <button className="rechazar" onClick={noAceptaJustificativo}>Rechazar</button>
        </div>
      </div>
    </div>
  );
}

export default AprobarJustificativo;