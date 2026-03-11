import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div className="jumbotron p-5 bg-light rounded-3 shadow-sm text-center mt-5">
            <h1 className="display-4 text-primary">¡Bienvenido a AdminSena!</h1>
            <p className="lead text-secondary mt-3">Gestiona aprendices, instructores, cursos y más de manera sencilla.</p>
            <hr className="my-4" />
            <p>Utiliza el menú de navegación superior para comenzar.</p>
            <div className="d-flex justify-content-center gap-3 mt-4">
                <Link className="btn btn-primary btn-lg px-4" to="/apprentices" role="button">Gestionar Aprendices</Link>
                <Link className="btn btn-outline-secondary btn-lg px-4" to="/courses" role="button">Ver Cursos</Link>
            </div>
        </div>
    );
}

export default Dashboard;
