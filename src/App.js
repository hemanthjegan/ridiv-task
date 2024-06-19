import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Favorites from './components/Favorites';

function App() {
    return (
        <Router>
            <div className='container'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
                <p className='copyright'>
                    Designed by<span> Hemanth</span>
                </p>
            </div>
        </Router>
    );
}

export default App;
