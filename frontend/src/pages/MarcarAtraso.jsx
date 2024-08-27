import React, { useState, useEffect } from 'react';
import Ticket from '../components/Ticket';
import logoLiceo from '../assets/logo-Blanco-Negro.png';
import { obtenerFechaYHoraActual } from '../helpers/FechaHoraActual.jsx';
import marcarAtraso from '../services/marcarAtraso.service.js'
import NavBar from '../components/NavBar.jsx';
import '../styles/atraso.css';

function MarcarAtraso() {
    const [rut, setRut] = useState('');
    const [ticketVisible, setTicketVisible] = useState(false);
    const [ticketData, setTicketData] = useState({});
    const [fechaYHora, setFechaYHora] = useState('');
    //useEffect para rendederizar Fecha y Hora Actual en Pantalla
    useEffect(() => {
        const actualizarFechaYHora = () => {
            setFechaYHora(obtenerFechaYHoraActual());
        };

        actualizarFechaYHora(); // Actualizar inmediatamente al montar el componente
        const intervalo = setInterval(actualizarFechaYHora, 1000);

        return () => clearInterval(intervalo); // Limpiar el intervalo al desmontar el componente
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // llamadoBackend
            const response = await marcarAtraso(rut);
            setTicketData(response.data);  // Ajusta según el formato del JSON recibido
            setTicketVisible(true);
        } catch (error) {
            console.error("Error al registrar el atraso:", error);
        }
    };

    return (
        <div className="atraso-container">
            <NavBar />
            <main>
                <h1>{fechaYHora}</h1>
                <form className="form-atraso" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="rut">Ingrese el RUT:</label>
                        <input 
                            className="rut-input"
                            type="text" 
                            id="rut" 
                            value={rut} 
                            onChange={(e) => setRut(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit">Registrar Atraso</button>
                </form>

                {ticketVisible && (
                    <Ticket 
                        nombre={ticketData.nombre}
                        curso={ticketData.curso}
                        totalAtrasos={ticketData.totalAtrasos}
                        fecha={ticketData.fecha}
                        hora={ticketData.hora}
                        logo={logoLiceo}
                    />
                )}
            </main>
        </div>
    );
}

export default MarcarAtraso;
