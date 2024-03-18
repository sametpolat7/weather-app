import { createContext, useState, useContext } from "react";
import axios from "axios";

const WeatherInfoContext = createContext();

export const useWeatherInfo = () => useContext(WeatherInfoContext);

const initialLocation = [
    'Ankara',
    'İzmir',
    'İstanbul',
    'Eskişehir',
    'Malatya',
    'Çanakkale',
    'Trabzon'
]


export default function WeatherInfoProvider({ children }) {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const [location, setLocation] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('')

    const filteredLocation = initialLocation.filter((l) => {
        return l.toLocaleLowerCase('tr-TR').includes(location.toLocaleLowerCase('tr-TR'))
    })

    const handleChange = ((e) => {
        setLocation(e.target.value)
    })

    const handleClick = (e) => {
        let selected = e.target.innerText;
        setSelectedLocation(selected);
    }

    const fetchData = async () => {
        try {
            const response = await axios(`https://api.openweathermap.org/data/2.5/weather?q=Dallas&appid=9e10d684e65746e51c546adac958a314`);
            const data = await response.data
            setWeatherData(data);
        } catch {
            setError('Weather information not available. Please try again. If you get the error again, try a different location.');
        }
    };

    return (
        <WeatherInfoContext.Provider value={{ location, filteredLocation, handleChange, handleClick }}>
            {children}
        </WeatherInfoContext.Provider>
    );
}