import React, { useState } from 'react';
import Form from '../components/Form.jsx';
import { uploadJustificativo } from '../services/justificativo.service.js';

// Función para normalizar la fecha al formato YYYY-MM-DD
function normalizeDate(dateString) {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
}

// Función para normalizar la hora al formato HH:mm:ss
function normalizeTime(timeString) {
    return `${timeString}:00`; // Agrega ":00" para los segundos
}


export default function JustificativoForm() {
    const [formData, setFormData] = useState({
        motivo: '',
        fecha: '',
        hora: '',
        archivo: null
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (event) => {
        setFormData({
            ...formData,
            archivo: event.target.files[0]
        });
    };

    const handleSubmit = async () => {
        const requestData = new FormData();
         // Normalizar fecha y hora
        const fechaNormalizada = normalizeDate(formData.fecha); // "YYYY-MM-DD"
        const horaNormalizada = normalizeTime(formData.hora);   // "HH:mm:ss"
        requestData.append('motivo', formData.motivo);
        requestData.append('fecha', formData.fecha);
        requestData.append('hora', formData.hora);
        if (formData.archivo) {
            requestData.append('archivo', formData.archivo);
        }

        try {
            const result = await uploadJustificativo(requestData);
            alert('Justificativo subido con éxito');
        } catch (error) {
            alert('Error al enviar el justificativo: ' + error.message);
        }
    };

    const fields = [
        {
            name: 'motivo',
            label: 'Motivo',
            placeholder: 'Ingresa el motivo del atraso',
            type: 'text',
            value: formData.motivo,
            required: true,
            onChange: handleInputChange
        },
        {
            name: 'fecha',
            label: 'Fecha',
            placeholder: 'Ingresa la fecha del atraso',
            type: 'date',
            value: formData.fecha,
            required: true,
            onChange: handleInputChange
        },
        {
            name: 'hora',
            label: 'Hora',
            placeholder: 'Ingresa la hora del atraso',
            type: 'time',
            value: formData.hora,
            required: true,
            onChange: handleInputChange
        },
        {
            name: 'archivo',
            label: 'Subir archivo',
            type: 'file',
            onChange: handleFileChange
        }
    ];

    return (
        <Form
            title="Subir Justificativo"
            fields={fields}
            buttonText="Enviar"
            onSubmit={handleSubmit}
            backgroundColor="#fdfdfd"
        />
    );
}