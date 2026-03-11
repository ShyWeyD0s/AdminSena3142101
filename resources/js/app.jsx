import './bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Apprentices from './pages/Apprentices';
import Areas from './pages/Areas';
import Computers from './pages/Computers';
import Courses from './pages/Courses';
import Teachers from './pages/Teachers';
import TrainingCenters from './pages/TrainingCenters';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/apprentices" element={<Apprentices />} />
                    <Route path="/areas" element={<Areas />} />
                    <Route path="/computers" element={<Computers />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/teachers" element={<Teachers />} />
                    <Route path="/training-centers" element={<TrainingCenters />} />
                </Routes>
            </div>
        </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
