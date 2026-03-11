import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Areas() {
    const [areas, setAreas] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        fetchAreas();
    }, []);

    const fetchAreas = async () => {
        try {
            const response = await axios.get('/api/areas');
            setAreas(response.data);
        } catch (error) {
            console.error('Error fetching areas:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/areas', { name });
            setName('');
            fetchAreas();
            alert('Área agregada correctamente');
        } catch (error) {
            console.error('Error creating area:', error);
            const message = error.response?.data?.message || 'Error desconocido';
            const errors = error.response?.data?.errors;
            let errorDetails = message;
            if (errors) {
                errorDetails += '\n' + Object.values(errors).flat().join('\n');
            }
            alert('Error al crear el área: ' + errorDetails);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta área?')) {
            try {
                await axios.delete(`/api/areas/${id}`);
                fetchAreas();
            } catch (error) {
                console.error('Error deleting area:', error);
            }
        }
    };

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-header bg-primary text-white">
                <h2 className="mb-0">Gestión de Áreas</h2>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre del Área"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <button className="btn btn-success" type="submit">Agregar Área</button>
                    </div>
                </form>

                <table className="table table-hover table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {areas.map((area) => (
                            <tr key={area.id}>
                                <td>{area.name}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(area.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Areas;
