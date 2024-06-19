import React, { useState, useEffect } from 'react';
import WeatherInfo from './WeatherInfo';
import Search from './Search';
import { Link } from 'react-router-dom';
import Forecast from './Forecast';

function Home() {
    const [inputText, setInputText] = useState(localStorage.getItem('lastCity') || 'Chennai');
    const [icon, setIcon] = useState('');
    const [temp, setTemp] = useState(0);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('IN');
    const [lati, setLati] = useState(0);
    const [long, setLong] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [wind, setWind] = useState(0);
    const [type, setType] = useState('');
    const [cityNotFound, setCityNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isCelsius, setIsCelsius] = useState(true);
    const [forecast, setForecast] = useState([]);
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

    const HandleSearch = async () => {
        setLoading(true);

        let api_key = '2ca78b2a64874af7b56170216240102&q';
        let url = `http://api.weatherapi.com/v1/forecast.json?key=${api_key}=${inputText}&days=5`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                console.error('City not found');
                setCityNotFound(true);
                setLoading(false);
                return;
            }

            setHumidity(data.current.humidity);
            setWind(data.current.wind_kph);
            setTemp(Math.floor(data.current.temp_c));
            setCity(data.location.name);
            setCountry(data.location.country);
            setLati(data.location.lat);
            setLong(data.location.lon);
            setIcon(data.current.condition.icon);
            setForecast(data.forecast.forecastday);
            localStorage.setItem('lastCity', data.location.name);

        } catch (error) {
            console.error("An error occurred:", error.message);
            // setError('An error occurred while fetching data');
        } finally {
            setLoading(false);
        }
    };

    const iconsName = [113, 116, 119, 122, 143, 176, 179, 182, 185, 200, 227, 230, 248, 260, 263, 266, 281, 284, 293, 296, 299, 302, 305, 308, 311, 314, 317, 320, 323, 326, 329, 332, 335, 338, 350, 353, 356, 359, 362, 365, 368, 371, 374, 377, 386, 389, 392, 395, 185, 200, 227, 230, 248, 260, 263, 266, 281, 284, 293, 296, 299, 302, 305, 308, 311, 314, 317, 320, 323, 326, 329, 332, 335, 338, 250, 353, 356, 359, 362, 365, 368, 371, 374, 377, 386, 389, 392, 113, 116, 119, 122, 143, 176, 179, 182, 395];

    
    iconsName.map((num)=>{
        // const dayType = [`//cdn.weatherapi.com/weather/64x64/day/${num}.png`, `//cdn.weatherapi.com/weather/64x64/night/${num}.png`];

        // dayType.map((e, index)=> {
        //     <p key={index}></p>
        //     if(e === icon){
        //         if(index === 0){
        //             type = 'day';
        //             return;
        //         }else{
        //             type = 'night';
        //             return;
        //         }
        //     }
        //     return;
        // })

        const day = `//cdn.weatherapi.com/weather/64x64/day/${num}.png`;
        const night = `//cdn.weatherapi.com/weather/64x64/night/${num}.png`;

        if(icon === day){
            setType('day')
            setIcon(num,'.png');
            return;

        }else if(icon === night){
            setType('night')
            setIcon(num,'.png');
            return;
        }
    }) ;

    const handleCity = (e) => {
        setInputText(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            HandleSearch();
        }
    };

    const toggleTemperatureUnit = () => {
        setIsCelsius(!isCelsius);
    };

    const handleFavoriteToggle = async () => {
        const existingFavorite = favorites.find(fav => fav.city === city);

        if (existingFavorite) {
            try {
                await fetch(`http://localhost:3000/favorites/${existingFavorite.id}`, { method: 'DELETE' });
                setFavorites(favorites.filter(fav => fav.city !== city));
            } catch (error) {
                console.error("Error removing favorite city:", error.message);
            }
        } else {
            try {
                const response = await fetch('http://localhost:3000/favorites', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ city })
                });
                const newFavorite = await response.json();
                setFavorites([...favorites, newFavorite]);
            } catch (error) {
                console.error("Error adding favorite city:", error.message);
            }
        }
    };

    useEffect(() => {
        HandleSearch();
        fetchFavorites();
    }, [city]);

    return (
        <>
            <div className="search-container">
                <Search 
                    inputText={inputText} 
                    handleCity={handleCity} 
                    handleKeyDown={handleKeyDown} 
                    HandleSearch={HandleSearch} 
                />
                <img 
                    src={favorites.find(fav => fav.city === city) ? './assets/favorite-filled.png' : './assets/favorite-empty.png'}
                    alt="Favorite Icon"
                    className="favorite-icon"
                    onClick={handleFavoriteToggle}
                />
            </div>

            {loading && <div className='loading-message'>Loading...</div>}
            {error && <div className='error-message'>{error}</div>}
            {cityNotFound && <div className='city-not-found'>City not found</div>}

            {!loading && !cityNotFound && (
                <>
                    <WeatherInfo 
                        icon={icon} 
                        temp={temp} 
                        city={city} 
                        country={country} 
                        lati={lati} 
                        long={long} 
                        humidity={humidity} 
                        wind={wind} 
                        type={type} 
                        isCelsius = {isCelsius}
                    />
                    <Forecast forecast={forecast} isCelsius={isCelsius} />
                    {/* <button onClick={toggleTemperatureUnit}>
                            {isCelsius ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
                    </button> */}
                    <Link to="/favorites" className='favorites-button'>
                        Favourites
                    </Link>
                </>
            )}
        </>
    );
}

export default Home;
