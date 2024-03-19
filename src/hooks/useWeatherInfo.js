import { useContext } from "react";
import { WeatherInfoContext } from "../context/Context";

export const useWeatherInfo = () => useContext(WeatherInfoContext);