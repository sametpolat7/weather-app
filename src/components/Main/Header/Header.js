import clouds from '../../../assets/clouds.mp4'
import { useWeatherInfo } from '../../../context/Context';

function Header() {
    return (
        <div className='header'>
            <video autoPlay loop muted>
                <source src={clouds} type="video/mp4" />
            </video>
            <Input />
        </div>
    )
}

function Input() {
    const {location, filteredLocation, handleChange, handleClick} = useWeatherInfo()
    return (
        <>
            <form>
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
                        filteredLocation.map((location, i) => {
                            return <li key={i} onClick={handleClick}>{location}</li>
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default Header;

