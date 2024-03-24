import { useRef } from "react";
import { useWeatherInfo } from "../../../hooks/useWeatherInfo";
import weatherIcons from "../../../assets/weather-icons/weatherIcons";
import { IconsFunction } from "../../Shared/IconsFunction";

export function Hourly() {
    const wrapper = useRef(null)
    const { weatherInfo } = useWeatherInfo();

    const hourlyInfo = weatherInfo.hourly;
    const dailyInfo = weatherInfo.daily; // For sunrise - sunset infos.
    const srise = new Date(dailyInfo.sunrise[0]).getHours();
    const sset = new Date(dailyInfo.sunset[0]).getHours();

    const icons = hourlyInfo.weather_code;

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
                                            if (new Date(time).getHours() === srise) {
                                                return <img src={weatherIcons.sunrise} alt="sunrise" />
                                            }
                                            else if (new Date(time).getHours() === sset) {
                                                return <img src={weatherIcons.sunset} alt="sunset" />
                                            }
                                            else if (hourlyInfo.is_day[index] === 0) {
                                                return <img src={weatherIcons.night} alt="night" />
                                            }
                                            else {
                                                return <IconsFunction condition={icons[index]} />
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