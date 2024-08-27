import React from 'react';

const Tabla = ({ datos, columnas }) => {
  return (
    <div className="container-listaAlumnos">
      <table>
        <thead>
          <tr>
            {columnas.map((columna) => (
              <th key={columna}>{columna}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map((fila) => (
            <tr key={fila.rut}>
              {columnas.map((columna) => (
                <td key={columna}>{fila[columna]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabla;