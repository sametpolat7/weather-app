import { useRef } from "react";
import { useWeatherInfo } from "../../../hooks/useWeatherInfo";
import weatherIcons from "../../../assets/weather-icons/weatherIcons";

export function Hourly() {
    const wrapper = useRef(null)
    const { weatherInfo } = useWeatherInfo();

    const hourlyInfo = weatherInfo.hourly;
    const dailyInfo = weatherInfo.daily; // For sunrise - sunset infos.
    const todaySunrise = new Date(dailyInfo.sunrise[0]).getHours();
    const todaySunset = new Date(dailyInfo.sunset[0]).getHours();

    const icons = hourlyInfo.weather_code;
    console.log('icons', icons);
    console.log('hourlyInfo', hourlyInfo);
    console.log('hourlyInfo.time', hourlyInfo.time);

    let slidingHourly;
    const handleMouseDown = (e) => {
        if (e.target.id === 'next') {
            slidingHourly = setInterval(() => {
                if (wrapper.current) {
                    wrapper.current.scrollLeft += 50;
                }
            }, 50)
        }
        else {
            slidingHourly = setInterval(() => {
                if (wrapper.current) {
                    wrapper.current.scrollLeft -= 50;
                }
            }, 50)
        }
    }

    const handleMouseUp = () => {
        clearInterval(slidingHourly)
    }
    return (
        <div className="hourly-weather col-12">
            <div
                id="prev"
                onMouseDown={(e) => handleMouseDown(e)}
                onMouseUp={handleMouseUp}
            >&#8249;</div>
            <div className="hourly-wrapper col-10" ref={wrapper}>
                {
                    hourlyInfo.time.map((time, index) => {
                        return (
                            <div className="time-boxes" key={time}>
                                <div>
                                    {index === 0 ? ('Now') : (
                                        new Date(time).getHours().toString().padStart(2, '0')
                                    )}
                                </div>
                                <div>
                                    {
                                        (() => {
                                            if (new Date(time).getHours() === todaySunrise) {
                                                return <img src={weatherIcons.sunrise} alt="sunrise" />
                                            }
                                            else if (new Date(time).getHours() === todaySunset) {
                                                return <img src={weatherIcons.sunset} alt="sunset" />
                                            }
                                            else if (hourlyInfo.is_day[index] === 0) {
                                                return <img src={weatherIcons.night} alt="night" />
                                            }
                                            else {
                                                if (icons[index] === 0) {
                                                    return <img src={weatherIcons.sunny} alt="sunny" />;
                                                } else if (icons[index] > 0 && icons[index] <= 3) {
                                                    return <img src={weatherIcons.cloudy} alt="cloudy" />;
                                                } else if (icons[index] >= 45 && icons[index] <= 48) {
                                                    return <img src={weatherIcons.fog} alt="fog" />;
                                                } else if (icons[index] >= 51 && icons[index] <= 67) {
                                                    return <img src={weatherIcons.rainy} alt="rainy" />;
                                                } else if (icons[index] >= 71 && icons[index] <= 77) {
                                                    return <img src={weatherIcons.snowy} alt="snowy" />;
                                                } else if (icons[index] >= 80 && icons[index] <= 82) {
                                                    return <img src={weatherIcons.rainy} alt="rainy" />;
                                                } else if (icons[index] >= 95 && icons[index] <= 99) {
                                                    return <img src={weatherIcons.thunderstorm} alt="thunderstorm" />;
                                                } else {
                                                    return <img src={weatherIcons.cloudy} alt="cloudy" />;
                                                }
                                            }
                                        })()
                                    }
                                </div>
                                <div>
                                    <b>{hourlyInfo.temperature_2m[index].toFixed(0)}°</b>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div
                id="next"
                onMouseDown={(e) => handleMouseDown(e)}
                onMouseUp={handleMouseUp}
            >&#8250;</div>
        </div>
    )
}