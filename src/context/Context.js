import { createContext, useEffect, useState } from "react";
import axios from "axios";
import forecastifyImg from '../assets/brand-logo/forecastify-logo.png'

export const WeatherInfoContext = createContext();

export default function WeatherInfoProvider({ children }) {
    const [city, setCity] = useState({
        cityName: 'Çanakkale',
        coords: {
            lat: 40.125,
            lng: 29.4375
        }
    });
    const [weatherInfo, setWeatherInfo] = useState([]);

    const values = {
        city,
        setCity,
        weatherInfo
    }

    useEffect(() => {
        const fetchWeatherForecast = async () => {
            const params = {
                latitude: city.coords.lat,
                longitude: city.coords.lng,
                timezone: 'auto',
                forecast_hours: 24,
                hourly: 'temperature_2m,precipitation_probability,weather_code,is_day',
                daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_mean,weather_code,sunrise,sunset,daylight_duration',
                current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m'
            }
            const response = await axios('https://api.open-meteo.com/v1/forecast?', { params });
            const data = await response.data;
            setWeatherInfo(data);
        }
        fetchWeatherForecast();
    }, [city])

    return (
        <WeatherInfoContext.Provider value={values}>
            {
                weatherInfo.length === 0 ? (
                    <div className="opening-animation">
                        <img src={forecastifyImg} alt="Brand Logo"/>
                        <div className="loading-bar">
                            <div></div>
                        </div>
                    </div>
                ) : (
                    <div className="main">{children}</div>
                )
            }
        </WeatherInfoContext.Provider>
    );
}