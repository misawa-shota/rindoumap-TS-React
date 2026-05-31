import sunny from "../assets/weatherIcons/sunny.svg";
import sunny_and_cloud from "../assets/weatherIcons/sunny_and_cloud.svg";
import sunny_and_rain from "../assets/weatherIcons/sunny_and_rain.svg";
import sunny_and_little_rain from "../assets/weatherIcons/sunny_and_little_rain.svg";
import sunny_and_snow from "../assets/weatherIcons/sunny_and_snow.svg";
import cloudy from "../assets/weatherIcons/cloudy.svg";
import rain from "../assets/weatherIcons/rain.svg";
import little_rain from "../assets/weatherIcons/little_rain.svg";
import extream_rain from "../assets/weatherIcons/extream_rain.svg";
import fog from "../assets/weatherIcons/fog.svg";
import snow_and_rain from "../assets/weatherIcons/snow_and_rain.svg";
import snow from "../assets/weatherIcons/snow.svg";
import little_snow from "../assets/weatherIcons/little_snow.svg";
import thunder_and_rain from "../assets/weatherIcons/thunder_and_rain.svg";

const useGetWeatherIcon = () => {
    const getWeatherIcon = (weatherCode: number): { weatherIcon: string; weatherName: string; } => {
        switch (weatherCode) {
            case 0:
            case 1:
                return {
                    'weatherIcon': sunny,
                    'weatherName': '快晴',
                };
            case 2:
                return {
                    'weatherIcon': sunny_and_cloud,
                    'weatherName': '晴れと曇り',
                };
            case 3:
            default:
                return {
                    'weatherIcon': cloudy,
                    'weatherName': '曇り',
                };
            case 45:
            case 48:
                return {
                    'weatherIcon': fog,
                    'weatherName': '霧',
                };
            case 51:
            case 53:
            case 55:
            case 56:
            case 57:
            case 61:
                return {
                    'weatherIcon': little_rain,
                    'weatherName': '小雨',
                };
            case 63:
                return {
                    'weatherIcon': rain,
                    'weatherName': '雨',
                };
            case 65:
                return {
                    'weatherIcon': extream_rain,
                    'weatherName': '大雨',
                };
            case 66:
            case 67:
                return {
                    'weatherIcon': snow_and_rain,
                    'weatherName': 'みぞれ',
                };
            case 71:
            case 77:
                return {
                    'weatherIcon': little_snow,
                    'weatherName': '小雪',
                };
            case 73:
            case 75:
                return {
                    'weatherIcon': snow,
                    'weatherName': '雪',
                };
            case 80:
                return {
                    'weatherIcon': sunny_and_little_rain,
                    'weatherName': '晴れと小雨',
                };
            case 81:
            case 82:
                return {
                    'weatherIcon': sunny_and_rain,
                    'weatherName': '晴れと雨',
                };
            case 85:
            case 86:
                return {
                    'weatherIcon': sunny_and_snow,
                    'weatherName': '晴れと雪',
                };
            case 95:
            case 96:
            case 99:
                return {
                    'weatherIcon': thunder_and_rain,
                    'weatherName': '雷雨',
                };
        }
    };

    return { getWeatherIcon };
};

export default useGetWeatherIcon;
