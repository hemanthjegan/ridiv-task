import React from 'react';

const Forecast = ({ forecast, isCelsius }) => {
    return (
        <div className='forecast'>
            <div className='forecast-container'>
                {forecast.map((day, index) => (
                    <div className='forecast-day' key={index}>
                        <img src={day.day.condition.icon} alt='weather-icon' />
                        <div className='forecast-date'>{new Date(day.date).toLocaleDateString()}</div>
                        <div className='forecast-temp'>
                            {isCelsius ? `${Math.round(day.day.avgtemp_c)}°C` : `${Math.round(day.day.avgtemp_f)}°F`}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Forecast;
