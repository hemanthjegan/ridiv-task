import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    const fetchFavorites = async () => {
        try {
            const response = await fetch('http://localhost:3000/favorites');
            const data = await response.json();
            setFavorites(data);
        } catch (error) {
            console.error("Error fetching favorite cities:", error.message);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <div className="favorites-container">
            <h2>Favorite Cities</h2>
            <ul className="favorites-list">
                {favorites.map((favorite, index) => (
                    <li key={index}>
                        {favorite.city}
                    </li>
                ))}
            </ul>
            <Link to="/" className="home-button">
                Home
            </Link>
        </div>
    );
}

export default Favorites;
