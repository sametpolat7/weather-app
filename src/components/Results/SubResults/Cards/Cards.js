import cardsIcons from "../../../../assets/cards-icons/cardsIcons";

export function Cards({ currentInfo, dailyInfo }) {
    let daylightHours = parseInt(dailyInfo.daylight_duration[0] / 3600);
    let daylightMinutes = parseInt((dailyInfo.daylight_duration[0] % 3600) / 60);
    return (
        <div className="cards col-6">
            <div className="cards-wrapper col-12">
                <div>
                    <p>
                        <img src={cardsIcons.feelslike} alt='feelslike_pic' />
                        &nbsp;
                        FEELS LIKE (°)
                    </p>
                    <p>{currentInfo.apparent_temperature}</p>
                </div>
                <div>
                    <p>
                        <img src={cardsIcons.sunrise} alt='sunrise_pic' />
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
                <div>
                    <p>
                        <img src={cardsIcons.sunset} alt='sunset_pic' />
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
                <div>
                    <p>
                        <img src={cardsIcons.humidity} alt='humidity_pic' />
                        &nbsp;
                        HUMIDITY (%)
                    </p>
                    <p>
                        {
                            `${currentInfo.relative_humidity_2m}`
                        }
                    </p>
                </div>
                <div>
                    <p>
                        <img src={cardsIcons.wind} alt='wind_pic' />
                        &nbsp;
                        WIND (km/h)
                    </p>
                    <p>{currentInfo.wind_speed_10m}</p>
                </div>
                <div>
                    <p>
                        <img src={cardsIcons.wind} alt='wind_pic' />
                        &nbsp;
                        WIND (°)
                    </p>
                    <p>{currentInfo.wind_direction_10m}</p>
                </div>
                <div className='daylight'>
                    <p>
                        <img src={cardsIcons.daylight} alt="daylight"/>
                        &nbsp;
                        DAYLIGHT DURATION
                    </p>
                    <p>
                        {daylightHours} hours {daylightMinutes} minutes
                    </p>
                </div>
            </div>
        </div>
    )
}