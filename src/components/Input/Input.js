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
                    name_startsWith: location,
                    cities: "cities5000",
                    maxRows: 10,
                    type: "json",
                    orderby: "population",
                    username: "sametpolat7"
                };
                try {
                    const response = await axios('https://api.geonames.org/search?', { params });
                    const cities = await response.data;
                    setCities(cities.geonames);
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
                            cities.length !== 0 ? (
                                cities.map((city) => {
                                    return (
                                        <li
                                            key={city.geonameId}
                                            onClick={() => handleClick(city.toponymName, city.lat, city.lng)}
                                        >
                                            <div>
                                                <p><b>{city.toponymName}</b></p>
                                                <p>{` ${city.adminName1} ${city.countryName}`}</p>
                                            </div>
                                            <div>
                                                <p>Latitude : {city.lat}</p>
                                                <p>Longitude : {city.lng}</p>
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