import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Courses() {
    const [courses, setCourses] = useState([]);
    const [areas, setAreas] = useState([]);
    const [centers, setCenters] = useState([]);
    const [formData, setFormData] = useState({
        course_number: '',
        day: '',
        area_id: '',
        training_center_id: ''
    });

    useEffect(() => {
        fetchCourses();
        fetchAreas();
        fetchCenters();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('/api/courses');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
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
            await axios.post('/api/courses', formData);
            setFormData({ course_number: '', day: '', area_id: '', training_center_id: '' });
            fetchCourses();
            alert('Curso agregado correctamente');
        } catch (error) {
            console.error('Error creating course:', error);
            const message = error.response?.data?.message || 'Error desconocido';
            const errors = error.response?.data?.errors;
            let errorDetails = message;
            if (errors) {
                errorDetails += '\n' + Object.values(errors).flat().join('\n');
            }
            alert('Error al crear el curso: ' + errorDetails);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este curso?')) {
            try {
                await axios.delete(`/api/courses/${id}`);
                fetchCourses();
            } catch (error) {
                console.error('Error deleting course:', error);
            }
        }
    };

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-header bg-primary text-white">
                <h2 className="mb-0">Gestión de Cursos</h2>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="row g-3">
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Número de Curso"
                                value={formData.course_number}
                                onChange={(e) => setFormData({ ...formData, course_number: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Día"
                                value={formData.day}
                                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
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
                            <button className="btn btn-success px-4" type="submit">Agregar Curso</button>
                        </div>
                    </div>
                </form>

                <table className="table table-hover table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Número</th>
                            <th>Día</th>
                            <th>Área</th>
                            <th>Centro de Formación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id}>
                                <td>{course.course_number}</td>
                                <td>{course.day}</td>
                                <td>{course.area?.name || 'N/A'}</td>
                                <td>{course.training_center?.name || 'N/A'}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(course.id)}
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

export default Courses;
