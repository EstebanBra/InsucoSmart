import React from 'react';
import '../styles/Ticket.css';

const Ticket = ({ nombre, curso, totalAtrasos, fecha, hora, logo }) => {
    return (
        <div className="ticket">
            <h2>Ticket de Atraso</h2>
            <p>{nombre}</p>
            <img src={logo} alt="Logo Liceo Insuco" />
            <p>Liceo Insuco</p>
            <p>{curso}</p>
            <p>{fecha}</p>
            <p>{hora}</p>
            <p>Total de atrasos: {totalAtrasos}</p>

        </div>
    );
};

export default Ticket;
