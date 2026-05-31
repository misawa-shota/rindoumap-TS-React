import { Daily } from './Daily';
import { Hourly } from './Hourly';
import { Current } from './Current';

type WeatherData = {
    hourly: Hourly[];
    daily: Daily[];
    current: Current;
};

export type { WeatherData };
