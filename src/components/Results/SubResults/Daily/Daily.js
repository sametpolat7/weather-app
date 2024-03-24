import weatherIcons from '../../../../assets/weather-icons/weatherIcons';
import { IconsFunction } from '../../../Shared/IconsFunction';


export function Daily({ dailyInfo }) {
    const days = [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    ]
    return (
        <div className="daily col-6">
            {
                dailyInfo.time.map((day, i) => {
                    return (
                        <div className="days" key={day}>
                            <div>
                                {
                                    i === 0 ? ('Today') : (
                                        days[new Date(day).getDay()]
                                    )
                                }
                            </div>
                            <div>
                                <div>
                                    {
                                        <IconsFunction condition={dailyInfo.weather_code[i]} />
                                    }
                                </div>
                                {
                                    dailyInfo.precipitation_probability_mean[i] !== 0 &&
                                    <div>
                                        {dailyInfo.precipitation_probability_mean[i]}%
                                    </div>
                                }
                            </div>
                            <div>
                                <div>
                                    <img src={weatherIcons.sunrise} alt='sunrise' />
                                    &nbsp;&nbsp;
                                    {
                                        `${new Date(dailyInfo.sunrise[i]).getHours().toString().padStart(2, '0')}:
                                        ${new Date(dailyInfo.sunrise[i]).getMinutes().toString().padStart(2, '0')}`
                                    }
                                </div>
                                <div>
                                    <img src={weatherIcons.sunset} alt='sunset' />
                                    &nbsp;&nbsp;
                                    {
                                        `${new Date(dailyInfo.sunset[i]).getHours().toString().padStart(2, '0')}:
                                        ${new Date(dailyInfo.sunset[i]).getMinutes().toString().padStart(2, '0')}`
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}