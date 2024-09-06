import React, { useState, useEffect } from 'react';
import { ListaAlumnos } from '../services/listaAlumnos.service.js';
import '../styles/tabla.css';
import NavBar from '../components/NavBar.jsx';
import DataTable from 'datatables.net-react';  // Importa el componente DataTables para React
import DT from 'datatables.net-dt';            // Importa los estilos y funcionalidades de DataTables

// Configura DataTables para que funcione con React
DataTable.use(DT);

function ListarAlumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerListaAlumnos = async () => {
      try {
        const response = await ListaAlumnos();
        setAlumnos(response.data);
      } catch (error) {
        setError(error);
      }
    };
    obtenerListaAlumnos();
  }, []);

  const columnas = [
    { title: 'Fecha Atraso ', data: 'fechaAtraso' },
    { title: 'Hora Atraso', data: 'horaAtraso' },
    { title: 'Curso', data: 'numeroCurso' },
    { title: 'Materia', data: 'nombreMateria' },
    { title: 'RUT', data: 'rutUsuario' },
    { title: 'Nombre', data: 'nombreUsuario' },
    { title: 'Justificado', data: 'justificado' },

  ];

  return (
    <div className="body-listaAlumnos">
      <NavBar />
      <div className="title">
        <h1>Atrasos de los Alumnos</h1>
      </div>
      {alumnos.length > 0 ? (
        <DataTable
          data={alumnos}
          columns={columnas}
          options={{
            paging: true,
            searching: true,
            ordering: true,
          }}
        />
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