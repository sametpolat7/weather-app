import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WeatherInfoContext = createContext();

export default function WeatherInfoProvider({ children }) {
    const [coords, setCoords] = useState({
        lat: null,
        lng: null
    });

    const values = {
        setCoords
    }

    useEffect(() => {
        const fetchWeatherForecast = async () => {
            const params = {
                latitude : coords.lat,
                longitude: coords.lng,
                hourly: 'temperature_2m'
            }
            const response = await axios('https://api.open-meteo.com/v1/forecast?', { params });
            const data = await response.data;
            console.log(response);
            console.log(data);
        }
        fetchWeatherForecast();
    }, [coords])

    return (
        <WeatherInfoContext.Provider value={values}>
            {console.log(coords)}
            {children}
        </WeatherInfoContext.Provider>
    );
}