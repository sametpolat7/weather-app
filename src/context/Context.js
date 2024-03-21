import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WeatherInfoContext = createContext();

export default function WeatherInfoProvider({ children }) {
    const [coords, setCoords] = useState({
        lat: 40.125,
        lng: 26.4375
    });
    const [weatherInfo, setWeatherInfo] = useState([])

    const values = {
        setCoords,
        weatherInfo
    }

    useEffect(() => {
        const fetchWeatherForecast = async () => {
            const params = {
                latitude: coords.lat,
                longitude: coords.lng,
                timezone: 'auto',
                forecast_hours: 24,
                hourly: 'temperature_2m,precipitation_probability,weather_code',
                daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_mean,weather_code,sunrise,sunset',
                current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m'
            }
            const response = await axios('https://api.open-meteo.com/v1/forecast?', { params });
            const data = await response.data;
            setWeatherInfo(data);
        }
        fetchWeatherForecast();
    }, [coords])

    console.log(weatherInfo);

    return (
        <WeatherInfoContext.Provider value={values}>
            {
                weatherInfo.length === 0 ? (
                    <div>Loading...</div>
                ) : (
                    <div className="main">{children}</div>
                )
            }
        </WeatherInfoContext.Provider>
    );
}