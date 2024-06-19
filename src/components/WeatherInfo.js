import React from 'react';

const WeatherInfo = ({ icon, temp, city, country, lati, long, humidity, wind, type , isCelsius}) => {
    return (
        <>
            <div className='image'>
                <img src={`./assets/${type}/${icon}.png`} alt='weather icon' />
            </div>
            <div className='temp'>{isCelsius ? `${temp}°C` : `${(temp * 9/5 + 32)}°F`}</div>
            <div className='location'>{city}</div>
            <div className='country'>{country}</div>
            <div className='data-container'>
                <div className='element'>
                    <img src='./assets/humidity-2.png' alt='humidity' className='icon'/>
                    <div className='data'>
                        <div className='humidity-percent'>{humidity}%</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>

                <div className='co-ordinates'>
                <div>
                    <span>{lati}</span>
                    <span className='lati'>latitude</span>
                </div>
                <div>
                    <span>{long}</span>
                    <span className='long'>longitude</span>
                </div>
                </div>
                <div className='element'>
                    <img src='./assets/wind.png' alt='wind' className='icon'/>
                    <div className='data'>
                        <div className='wind-speed'>{wind} Km/hr</div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WeatherInfo;
