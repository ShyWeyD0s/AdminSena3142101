import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Teachers() {
    const [teachers, setTeachers] = useState([]);
    const [areas, setAreas] = useState([]);
    const [centers, setCenters] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        area_id: '',
        training_center_id: ''
    });

    useEffect(() => {
        fetchTeachers();
        fetchAreas();
        fetchCenters();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await axios.get('/api/teachers');
            setTeachers(response.data);
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

    const fetchAreas = async () => {
        try {
            const response = await axios.get('/api/areas');
            setAreas(response.data);
        } catch (error) {
            console.error('Error fetching areas:', error);
        }
    };

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
            await axios.post('/api/teachers', formData);
            setFormData({ name: '', email: '', area_id: '', training_center_id: '' });
            fetchTeachers();
            alert('Instructor agregado correctamente');
        } catch (error) {
            console.error('Error creating teacher:', error);
            const message = error.response?.data?.message || 'Error desconocido';
            const errors = error.response?.data?.errors;
            let errorDetails = message;
            if (errors) {
                errorDetails += '\n' + Object.values(errors).flat().join('\n');
            }
            alert('Error al crear el instructor: ' + errorDetails);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este profesor?')) {
            try {
                await axios.delete(`/api/teachers/${id}`);
                fetchTeachers();
            } catch (error) {
                console.error('Error deleting teacher:', error);
            }
        }
    };

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-header bg-primary text-white">
                <h2 className="mb-0">Gestión de Profesores</h2>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="row g-3">
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre Completo"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo Electrónico"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <select
                                className="form-select"
                                value={formData.area_id}
                                onChange={(e) => setFormData({ ...formData, area_id: e.target.value })}
                                required
                            >
                                <option value="">Seleccionar Área</option>
                                {areas.map(area => (
                                    <option key={area.id} value={area.id}>{area.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <select
                                className="form-select"
                                value={formData.training_center_id}
                                onChange={(e) => setFormData({ ...formData, training_center_id: e.target.value })}
                                required
                            >
                                <option value="">Seleccionar Centro</option>
                                {centers.map(center => (
                                    <option key={center.id} value={center.id}>{center.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12 text-end">
                            <button className="btn btn-success px-4" type="submit">Agregar Profesor</button>
                        </div>
                    </div>
                </form>

                <table className="table table-hover table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Área</th>
                            <th>Centro de Formación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher) => (
                            <tr key={teacher.id}>
                                <td>{teacher.name}</td>
                                <td>{teacher.email}</td>
                                <td>{teacher.area?.name || 'N/A'}</td>
                                <td>{teacher.training_center?.name || 'N/A'}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(teacher.id)}
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

export default Teachers;
