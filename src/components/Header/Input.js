import { useEffect, useState } from 'react';
import axios from 'axios';

function Input() {
    const [location, setLocation] = useState('');
    const [notFound, setNotFound] = useState(null);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        if (location) {
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
                    const response = await axios('http://api.geonames.org/search?', { params });
                    const cities = await response.data;
                    if(cities.totalResultsCount === 0){
                        setNotFound('City not found!');
                        console.log(cities);
                    }
                    else{
                        setCities(cities.geonames);
                        console.log(cities);
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }, 500)
            return () => {
                clearTimeout(debounced)
            }
        }
        else{
            setCities([])
        }
    }, [location])

    const handleChange = ((e) => {
        setLocation(e.target.value);
        setNotFound(null);
    })

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className='col-6'>
                    <input
                        id='search'
                        value={location}
                        onChange={handleChange}
                        autoComplete='off'
                        required
                    />
                    <label htmlFor='search'>Search City</label>
                </div>
            </form>
            <div className='filtered-location col-6'>
                <ul>
                    {
                        cities.map((city) => {
                            return (
                                <li key={city.geonameId}>
                                    <div>
                                        <p><b>{city.toponymName}</b></p>
                                        <p>{` ${city.countryName} ${city.countryCode}`}</p>
                                    </div>
                                    <div>
                                        {city.fcodeName}
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default Input;