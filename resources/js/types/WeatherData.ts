import { Daily } from './Daily';
import { Hourly } from './HourlyData';

type WeatherData = {
    hourly: Hourly;
    daily: Daily;
};

export type { WeatherData };
