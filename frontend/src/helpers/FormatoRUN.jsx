export default function formatoRUN(texto) {
    // Elimina cualquier carácter que no sea un dígito o 'k/K'
    let RUN = texto.replace(/[^0-9kK]/g, '').toUpperCase();

    if (RUN.length <= 1) return RUN; // No formatear si el RUN es demasiado corto

    // Asegurarse de que solo haya un dígito verificador al final
    let cuerpo = RUN.slice(0, -1); // Parte numérica del RUN
    let dv = RUN.slice(-1); // Dígito verificador

    // Limitar el cuerpo del RUN a un máximo de 8 caracteres
    if (cuerpo.length > 8) {
        cuerpo = cuerpo.slice(0, 8);
    }

    // Formatear el cuerpo del RUN con puntos
    RUN = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `${RUN}-${dv}`;
}