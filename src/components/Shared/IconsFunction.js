import weatherIcons from "../../assets/weather-icons/weatherIcons";

export function IconsFunction({ condition }) {
    return (
        <>
            {
                (() => {
                    if (condition === 0) {
                        return <img src={weatherIcons.sunny} alt="sunny" />;
                    } else if (condition > 0 && condition <= 3) {
                        return <img src={weatherIcons.cloudy} alt="cloudy" />;
                    } else if (condition >= 45 && condition <= 48) {
                        return <img src={weatherIcons.fog} alt="fog" />;
                    } else if (condition >= 51 && condition <= 67) {
                        return <img src={weatherIcons.rainy} alt="rainy" />;
                    } else if (condition >= 71 && condition <= 77) {
                        return <img src={weatherIcons.snowy} alt="snowy" />;
                    } else if (condition >= 80 && condition <= 82) {
                        return <img src={weatherIcons.rainy} alt="rainy" />;
                    } else if (condition >= 95 && condition <= 99) {
                        return <img src={weatherIcons.thunderstorm} alt="thunderstorm" />;
                    } else {
                        return <img src={weatherIcons.cloudy} alt="cloudy" />;
                    }
                })()
            }
        </>
    )
}