import feelslike from '../../../../assets/cards-icons/feelslike.png';
import humidity from '../../../../assets/cards-icons/humidity.png';
import wind from '../../../../assets/cards-icons/wind.png';
import sunrise from '../../../../assets/cards-icons/sunrise.png';
import sunset from '../../../../assets/cards-icons/sunset.png';

export function Cards({ currentInfo, dailyInfo }) {
    console.log(currentInfo);
    console.log(dailyInfo);
    return (
        <div className="cards col-6">
            <div className="cards-wrapper col-12">
                <div className='feelslike'>
                    <p>
                        <img src={feelslike} alt='feelslike_pic' />
                        &nbsp;
                        FEELS LIKE (°)
                    </p>
                    <p>{currentInfo.apparent_temperature}</p>
                </div>
                <div className='sunrise'>
                    <p>
                        <img src={sunrise} alt='sunrise_pic' />
                        &nbsp;
                        SUNRISE (hh:mm)
                    </p>
                    <p>
                        {
                            `${new Date(dailyInfo.sunrise[0]).getHours().toString().padStart(2, '0')}:
                            ${new Date(dailyInfo.sunrise[0]).getMinutes().toString().padStart(2, '0')}`
                        }
                    </p>
                </div>
                <div className='sunset'>
                    <p>
                        <img src={sunset} alt='sunset_pic' />
                        &nbsp;
                        SUNSET (hh:mm)
                    </p>
                    <p>
                        {
                            `${new Date(dailyInfo.sunset[0]).getHours().toString().padStart(2, '0')}:
                            ${new Date(dailyInfo.sunset[0]).getMinutes().toString().padStart(2, '0')}`
                        }
                    </p>
                </div>
                <div className='humidity'>
                    <p>
                        <img src={humidity} alt='humidity_pic' />
                        &nbsp;
                        HUMIDITY (%)
                    </p>
                    <p>
                        {
                            `${currentInfo.relative_humidity_2m}`
                        }
                    </p>
                </div>
                <div className='wind-speed'>
                    <p>
                        <img src={wind} alt='wind_pic' />
                        &nbsp;
                        WIND (km/h)
                    </p>
                    <p>{currentInfo.wind_speed_10m}</p>
                </div>
                <div className='wind-direction'>
                    <p>
                        <img src={wind} alt='wind_pic' />
                        &nbsp;
                        WIND (°)
                    </p>
                    <p>{currentInfo.wind_direction_10m}</p>
                </div>
            </div>
        </div>
    )
}