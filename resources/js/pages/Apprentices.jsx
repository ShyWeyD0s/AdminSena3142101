import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Apprentices() {
    const [apprentices, setApprentices] = useState([]);
    const [courses, setCourses] = useState([]);
    const [computers, setComputers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cell_number: '',
        course_id: '',
        computer_id: ''
    });

    useEffect(() => {
        fetchApprentices();
        fetchCourses();
        fetchComputers();
    }, []);

    const fetchApprentices = async () => {
        try {
            const response = await axios.get('/api/apprentices');
            setApprentices(response.data);
        } catch (error) {
            console.error('Error fetching apprentices:', error);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get('/api/courses');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const fetchComputers = async () => {
        try {
            const response = await axios.get('/api/computers');
            setComputers(response.data);
        } catch (error) {
            console.error('Error fetching computers:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/apprentices', formData);
            setFormData({ name: '', email: '', cell_number: '', course_id: '', computer_id: '' });
            fetchApprentices();
            alert('Aprendiz agregado correctamente');
        } catch (error) {
            console.error('Error creating apprentice:', error);
            const message = error.response?.data?.message || 'Error desconocido';
            const errors = error.response?.data?.errors;
            let errorDetails = message;
            if (errors) {
                errorDetails += '\n' + Object.values(errors).flat().join('\n');
            }
            alert('Error al crear el aprendiz: ' + errorDetails);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este aprendiz?')) {
            try {
                await axios.delete(`/api/apprentices/${id}`);
                fetchApprentices();
            } catch (error) {
                console.error('Error deleting apprentice:', error);
            }
        }
    };

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-header bg-primary text-white">
                <h2 className="mb-0 text-center">Gestión de Aprendices</h2>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit} className="mb-5 row g-3">
                    <div className="col-md-4">
                        <label className="form-label fw-bold">Nombre Completo</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre del Aprendiz"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label fw-bold">Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="ejemplo@sena.edu.co"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label fw-bold">Número de Celular</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="3001234567"
                            value={formData.cell_number}
                            onChange={(e) => setFormData({ ...formData, cell_number: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-bold">Curso / Ficha</label>
                        <select
                            className="form-select"
                            value={formData.course_id}
                            onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
                            required
                        >
                            <option value="">Seleccione un curso</option>
                            {courses.map(course => (
                                <option key={course.id} value={course.id}>
                                    {course.course_number} - {course.area?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-bold">Computador Asignado</label>
                        <select
                            className="form-select"
                            value={formData.computer_id}
                            onChange={(e) => setFormData({ ...formData, computer_id: e.target.value })}
                            required
                        >
                            <option value="">Seleccione un computador</option>
                            {computers.map(computer => (
                                <option key={computer.id} value={computer.id}>
                                    Equipo: {computer.number} ({computer.brand})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 text-end">
                        <button className="btn btn-success px-5" type="submit">Agregar Aprendiz</button>
                    </div>
                </form>

                <hr />
                <h4 className="mb-3 text-secondary">Lista de Aprendices</h4>
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Celular</th>
                                <th>Curso / Ficha</th>
                                <th>Equipo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {apprentices.map((apprentice) => (
                                <tr key={apprentice.id}>
                                    <td>{apprentice.name}</td>
                                    <td>{apprentice.email}</td>
                                    <td>{apprentice.cell_number}</td>
                                    <td>{apprentice.course?.course_number}</td>
                                    <td>{apprentice.computer?.number} ({apprentice.computer?.brand})</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(apprentice.id)}
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
        </div>
    );
}

export default Apprentices;
