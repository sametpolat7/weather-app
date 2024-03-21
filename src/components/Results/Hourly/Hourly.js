import { useWeatherInfo } from "../../../hooks/useWeatherInfo";
import sunny from '../../../assets/weather-icons/sunny.png';
import cloudy from '../../../assets/weather-icons/cloudy.png';
import fog from '../../../assets/weather-icons/fog.png';
import rainy from '../../../assets/weather-icons/rainy.png';
import snowy from '../../../assets/weather-icons/snowy.png';
import thunderstorm from '../../../assets/weather-icons/thunderstorm.png';
import sunrise from '../../../assets/weather-icons/sunrise.png';
import sunset from '../../../assets/weather-icons/sunset.png';
import night from '../../../assets/weather-icons/night.png';

export function Hourly() {
    const { weatherInfo } = useWeatherInfo();
    console.log(weatherInfo.hourly);

    const hourlyInfo = weatherInfo.hourly;
    const dailyInfo = weatherInfo.daily; // For sunrise - sunset infos.
    const todaySunrise = new Date(dailyInfo.sunrise[0]).getHours();
    const todaySunset = new Date(dailyInfo.sunset[0]).getHours();
    console.log(todaySunrise);
    console.log(todaySunset);

    const temperatures = hourlyInfo.temperature_2m;
    const times = hourlyInfo.time;
    const icons = hourlyInfo.weather_code;

    const handleWheel = (e) => {
    const delta = Math.max(-1, Math.min(1, e.deltaY || -e.detail));
    const target = e.currentTarget;
    target.scrollLeft -= delta * 80;
    }

    return(
        <div className="hourly-weather col-12">
            <div className="hourly-wrapper col-10" onWheel={(e) => handleWheel(e)}>
                {
                    times.map((time, index) => {
                        return(
                            <div className="time-boxes" key={time}>
                                <div>
                                    {index === 0 ? ('Now') : (
                                        new Date(time).getHours().toString().padStart(2, '0')
                                        )}
                                </div>
                                <div>
                                    {
                                        (() => {
                                            if(new Date(time).getHours() === todaySunrise) {
                                                return <img src={sunrise} alt="sunrise"/>
                                            }
                                            else if(new Date(time).getHours() === todaySunset) {
                                                return <img src={sunset} alt="sunset"/>
                                            }
                                            else if(new Date(time).getHours() > 19 || new Date(time).getHours() < 6) {
                                                return <img src={night} alt="night"/>
                                            }
                                            else {
                                                switch(icons[index]) {
                                                    case 0:
                                                        return <img src={sunny} alt="sunny"/>
                                                    case 1:
                                                    case 2:
                                                    case 3:
                                                        return <img src={cloudy} alt="cloudy"/>
                                                    case 45:
                                                    case 48:
                                                        return <img src={fog} alt="fog" />
                                                    case 51:
                                                    case 52:
                                                    case 53:
                                                    case 54:
                                                    case 55:
                                                    case 56:
                                                    case 57:
                                                    case 61:
                                                    case 62:
                                                    case 63:
                                                    case 64:
                                                    case 65:
                                                    case 66:
                                                    case 67:
                                                        return <img src={rainy} alt="rainy" />
                                                    case 71:
                                                    case 72:
                                                    case 73:
                                                    case 74:
                                                    case 75:
                                                    case 76:
                                                    case 77:
                                                        return <img src={snowy} alt="snowy" />
                                                    case 95:
                                                    case 96:
                                                    case 97:
                                                    case 98:
                                                    case 99:
                                                        return <img src={thunderstorm} alt="thunderstorm" />
                                                    default:
                                                        return <img src={cloudy} alt="cloudy" />
                                                  }
                                            }
                                        })()
                                    }
                                </div>
                                <div>
                                    <b>{temperatures[index].toFixed(0)}°</b>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}