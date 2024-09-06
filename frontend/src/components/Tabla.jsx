import React from 'react';

const Tabla = ({ datos, columnas, titulos }) => {
  return (
    <div className="container-listaAlumnos">
      <table>
        <thead>
          <tr>
            {titulos.map((titulo) => (
              <th key={titulo}>{titulo}</th>
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