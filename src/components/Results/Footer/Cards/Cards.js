import feelslike from '../../../../assets/cards-icons/feelslike.png';
import humidity from '../../../../assets/cards-icons/humidity.png';
import wind from '../../../../assets/cards-icons/wind.png';
import sunrise from '../../../../assets/cards-icons/sunrise.png';
import sunset from '../../../../assets/cards-icons/sunset.png';

export function Cards({ currentInfo, dailyInfo }) {
    return (
        <div className="cards col-6">
            <div className="cards-wrapper col-12">
                <div>
                    <p>
                        <img src={feelslike} alt='feelslike_pic'/>
                        &nbsp;
                        FEELS LIKE
                    </p>
                    <p>{currentInfo.apparent_temperature}°</p>
                </div>
                <div>
                    <div>
                        <p>
                            <img src={sunrise} alt='sunrise_pic'/>
                            &nbsp;
                            SUNRISE
                        </p>
                        <b>
                            {
                                `${new Date(dailyInfo.sunrise[0]).getHours().toString().padStart(2, '0')}:
                            ${new Date(dailyInfo.sunrise[0]).getMinutes().toString().padStart(2, '0')}`
                            }
                        </b>
                    </div>
                    <div style={{fontSize: '16px'}}>
                        <p>
                            <img src={sunset} alt='sunset_pic'/>
                            &nbsp;
                            SUNSET
                        </p>
                        <b>
                            {
                                `${new Date(dailyInfo.sunset[0]).getHours().toString().padStart(2, '0')}:
                            ${new Date(dailyInfo.sunset[0]).getMinutes().toString().padStart(2, '0')}`
                            }
                        </b>
                    </div>
                </div>
                <div>
                    <p>
                        <img src={humidity} alt='humidity_pic'/>
                        &nbsp;
                        HUMIDITY (%)
                    </p>
                    <b>
                        {
                            `${currentInfo.relative_humidity_2m}`
                        }
                    </b>
                </div>
                <div>
                    <p>
                        <img src={wind} alt='wind_pic'/>
                        &nbsp;
                        WIND (km/h)
                    </p>
                    <div>
                        <p>{currentInfo.wind_speed_10m}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}