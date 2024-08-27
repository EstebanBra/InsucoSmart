import React from 'react';
import '../styles/ticket.css';

const Ticket = ({ nombre, curso, totalAtrasos, fechaHoraIngreso, logo }) => {
    return (
        <div className="ticket">
            <h2>Ticket de Atraso</h2>
            <p>{nombre}</p>
            <img src={logo} alt="Logo Liceo Insuco" />
            <p>Liceo Insuco</p>
            <p>{curso}</p>
            <p>{fechaHoraIngreso}</p>
            <p>Total de atrasos: {totalAtrasos}</p>

        </div>
    );
};

export default Ticket;
