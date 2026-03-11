import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Computers() {
    const [computers, setComputers] = useState([]);
    const [formData, setFormData] = useState({ number: '', brand: '' });

    useEffect(() => {
        fetchComputers();
    }, []);

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
            await axios.post('/api/computers', formData);
            setFormData({ number: '', brand: '' });
            fetchComputers();
            alert('Computador agregado correctamente');
        } catch (error) {
            console.error('Error creating computer:', error);
            const message = error.response?.data?.message || 'Error desconocido';
            const errors = error.response?.data?.errors;
            let errorDetails = message;
            if (errors) {
                errorDetails += '\n' + Object.values(errors).flat().join('\n');
            }
            alert('Error al crear el computador: ' + errorDetails);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este computador?')) {
            try {
                await axios.delete(`/api/computers/${id}`);
                fetchComputers();
            } catch (error) {
                console.error('Error deleting computer:', error);
            }
        }
    };

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-header bg-primary text-white">
                <h2 className="mb-0">Gestión de Computadores</h2>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="row g-2">
                        <div className="col-md-5">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Número (ej: PC-01)"
                                value={formData.number}
                                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-5">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Marca"
                                value={formData.brand}
                                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
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
                            <th>Número</th>
                            <th>Marca</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {computers.map((computer) => (
                            <tr key={computer.id}>
                                <td>{computer.number}</td>
                                <td>{computer.brand}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(computer.id)}
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

export default Computers;
