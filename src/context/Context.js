import { createContext, useState } from "react";
import axios from "axios";

export const WeatherInfoContext = createContext();

export default function WeatherInfoProvider({ children }) {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${'Dallas'}&appid=9e10d684e65746e51c546adac958a314`);
            const data = await response.data
            setWeatherData(data);
        } catch {
            setError('Weather information not available. Please try again. If you get the error again, try a different location.');
        }
    };

    const sharedValues = {
        weatherData,
        setWeatherData,
        error,
        fetchData
    }

    return (
        <WeatherInfoContext.Provider value={sharedValues}>
            {children}
        </WeatherInfoContext.Provider>
    );
}