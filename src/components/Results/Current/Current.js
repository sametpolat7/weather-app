import { useWeatherInfo } from '../../../hooks/useWeatherInfo';
import weatherCodeMeans from '../../../assets/weather-code/weatherCode';

export function Current() {
    const { city, weatherInfo } = useWeatherInfo();
    const currentInfo = weatherInfo.current;
    const dailyInfo = weatherInfo.daily;
    console.log(currentInfo);
    console.log(dailyInfo);
    return (
        <div className="current-weather col-12">
            <div className="current-wrapper col-10">
                <div>{city.cityName}</div>
                <div>{currentInfo.temperature_2m.toFixed(0)}°</div>
                <div>
                    <div>
                        <span>L: {dailyInfo.temperature_2m_min[0].toFixed(0)}°</span>
                        &nbsp;&nbsp;
                        <span>H: {dailyInfo.temperature_2m_max[0].toFixed(0)}°</span>
                    </div>
                    <div style={{fontSize: '2rem'}}>{weatherCodeMeans[currentInfo.weather_code]}</div>
                    <div>P: {currentInfo.precipitation}%</div>
                </div>
            </div>
        </div>
    )
}