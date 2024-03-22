import { Cards } from "./Cards/Cards";
import { Daily } from "./Daily/Daily";
import { useWeatherInfo } from '../../../hooks/useWeatherInfo';

export function Footer() {
    const { weatherInfo } = useWeatherInfo();
    const currentInfo = weatherInfo.current;
    const dailyInfo = weatherInfo.daily;
    return(
        <div className="footer">
            <Cards currentInfo={currentInfo} dailyInfo={dailyInfo}/>
            <Daily dailyInfo={dailyInfo}/>
        </div>
    )
}
