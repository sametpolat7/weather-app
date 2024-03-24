import { Cards } from "./Cards/Cards";
import { Daily } from "./Daily/Daily";
import { useWeatherInfo } from '../../../hooks/useWeatherInfo';

export function SubResults() {
    const { weatherInfo } = useWeatherInfo();
    const currentInfo = weatherInfo.current;
    const dailyInfo = weatherInfo.daily;
    return(
        <div className="sub-results">
            <Daily dailyInfo={dailyInfo}/>
            <Cards currentInfo={currentInfo} dailyInfo={dailyInfo}/>
        </div>
    )
}
