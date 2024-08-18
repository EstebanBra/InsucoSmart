export function obtenerFechaYHoraActual() {
    const opcionesFecha = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };

    const opcionesHora = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/Santiago'
    };

    const fecha = new Date();
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
    const horaFormateada = fecha.toLocaleTimeString('es-ES', opcionesHora);

        // Reemplaza la coma en el texto de la fecha
        const fechaSinComa = fechaFormateada.replace(',', '');
        // Capitaliza la primera letra de la fecha
        const fechaCapitalizada = fechaSinComa.charAt(0).toUpperCase() + fechaSinComa.slice(1);

    return `${fechaCapitalizada} ${horaFormateada}`;
}