import { useWeatherInfo } from '../../../hooks/useWeatherInfo';
import weatherCodeMeans from '../../../assets/weather-code/weatherCode';
import weatherBackgrounds from '../../../assets/weather-background/weatherBackgrounds';

export function Current() {
    const { city, weatherInfo } = useWeatherInfo();
    const currentInfo = weatherInfo.current;
    const dailyInfo = weatherInfo.daily;
    const weatherStatus = weatherCodeMeans[currentInfo.weather_code];

    console.log(currentInfo);
    console.log(dailyInfo);

    let imgSelecter;
    if(currentInfo.is_day !== 0) {
        switch (weatherStatus) {
            case 'Clear sky':
                imgSelecter = 'sunny'
                break;
            case 'Partly cloudy':
                imgSelecter = 'cloudy'
                break;
            case 'Foggy':
                imgSelecter = 'fog'
                break;
            case 'Rainy':
                imgSelecter = 'rainy'
                break;
            case 'Snowy':
                imgSelecter = 'snowy'
                break;
            case 'Thunderstorm':
                imgSelecter = 'thunderstorm'
                break;
            default:
                imgSelecter = 'sunny'
        }
    }
    else {
        imgSelecter = 'night'
    }

    const backgroundImg = {
        backgroundImage: `url(${weatherBackgrounds[imgSelecter]})`,
        backgroundSize: 'cover'
    }
    return (
        <div className="current-weather col-12" style={backgroundImg}>
            <div className="current-wrapper col-10">
                <div>{city.cityName}</div>
                <div>{currentInfo.temperature_2m.toFixed(0)}°</div>
                <div>
                    <div>
                        <span>L: {dailyInfo.temperature_2m_min[0].toFixed(0)}°</span>
                        &nbsp;&nbsp;
                        <span>H: {dailyInfo.temperature_2m_max[0].toFixed(0)}°</span>
                    </div>
                    <div>{weatherStatus}</div>
                    <div>P: {currentInfo.precipitation}%</div>
                </div>
            </div>
        </div>
    )
}