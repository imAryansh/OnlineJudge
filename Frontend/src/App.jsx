import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import About from './Components/About';
import AddProblems from "./Components/AddProblems";
import ProblemList from "./Components/ProblemList";
import ProblemDetails from "./Components/ProblemDetails";
import logo from './images/logo-no-background.png'; //will modify

import './Components/styles.css';

const App = () => {
    return (
        <div className="App">
            <nav className="navbar">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/AddProblems">Add Problems</Link></li>
                    <li><Link to="/problems">Problems</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/AddProblems" element={<AddProblems />} />
                <Route path="/problems" element={<ProblemList />} />
                <Route path="/problems/:problemId" element={<ProblemDetails />} />
            </Routes>
        </div>
    );
}

export default App;


