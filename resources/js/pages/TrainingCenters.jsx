import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TrainingCenters() {
    const [centers, setCenters] = useState([]);
    const [formData, setFormData] = useState({ name: '', location: '' });

    useEffect(() => {
        fetchCenters();
    }, []);

    const fetchCenters = async () => {
        try {
            const response = await axios.get('/api/training-centers');
            setCenters(response.data);
        } catch (error) {
            console.error('Error fetching centers:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/training-centers', formData);
            setFormData({ name: '', location: '' });
            fetchCenters();
            alert('Centro de formación agregado correctamente');
        } catch (error) {
            console.error('Error creating center:', error);
            const message = error.response?.data?.message || 'Error desconocido';
            const errors = error.response?.data?.errors;
            let errorDetails = message;
            if (errors) {
                errorDetails += '\n' + Object.values(errors).flat().join('\n');
            }
            alert('Error al crear el centro: ' + errorDetails);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este centro?')) {
            try {
                await axios.delete(`/api/training-centers/${id}`);
                fetchCenters();
            } catch (error) {
                console.error('Error deleting center:', error);
            }
        }
    };

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-header bg-primary text-white">
                <h2 className="mb-0">Gestión de Centros de Formación</h2>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="row g-2">
                        <div className="col-md-5">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre del Centro"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-5">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ubicación"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-success w-100" type="submit">Agregar</button>
                        </div>
                    </div>
                </form>

                <table className="table table-hover table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Ubicación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {centers.map((center) => (
                            <tr key={center.id}>
                                <td>{center.name}</td>
                                <td>{center.location}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(center.id)}
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

export default TrainingCenters;
