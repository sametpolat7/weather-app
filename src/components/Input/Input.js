import { useEffect, useState } from 'react';
import axios from 'axios';
import { useWeatherInfo } from '../../hooks/useWeatherInfo'

function Input() {
    const [location, setLocation] = useState('');
    const [cities, setCities] = useState([]);
    const [isFocus, setIsFocus] = useState(false);

    const { city, setCity } = useWeatherInfo();

    useEffect(() => {
        if (location.length > 0) {
            const debounced = setTimeout(async () => {
                const params = {
                    name: location,
                    count: 6
                };
                try {
                    const response = await axios('https://geocoding-api.open-meteo.com/v1/search', { params });
                    const cities = await response.data;
                    setCities(cities.results);
                }
                catch (err) {
                    console.log(err.code + ' ' + err.message);
                }
            }, 500)
            return () => {
                clearTimeout(debounced)
            }
        }
    }, [location])

    const handleChange = ((e) => {
        setLocation(e.target.value);
    })

    const handleClick = (name, lat, lng) => {
        setCity({
            ...city,
            cityName: name,
            coords: {
                ...city.coords,
                lat: lat,
                lng: lng
            }
        })
    }
    return (
        <div className='search'>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className='col-6'>
                    <input
                        id='search'
                        value={location}
                        onChange={handleChange}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => {
                            return setTimeout(() => {
                                setIsFocus(false)
                            }, 200)
                        }}
                        autoComplete='off'
                        spellCheck={false}
                        required
                    />
                    <label htmlFor='search'>Discover your city's weather forecast!</label>
                </div>
            </form>
            {
                isFocus &&
                <div className='filtered-location'>
                    <ul>
                        {
                            cities ? (
                                cities.map((city) => {
                                    return (
                                        <li
                                            key={city.id}
                                            onClick={() => handleClick(city.name, city.latitude, city.longitude)}
                                        >
                                            <div>
                                                <p><b>{city.name}</b></p>
                                                <p>{` ${city.country} ${city.country_code}`}</p>
                                            </div>
                                            <div>
                                                <p>Latitude : {city.latitude}</p>
                                                <p>Longitude : {city.longitude}</p>
                                            </div>
                                        </li>
                                    )
                                })
                            ) : (
                                <li>No results found.</li>
                            )
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default Input;