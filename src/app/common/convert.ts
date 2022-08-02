import { DailyForecasts } from "../models/dailyForecasts";
import { CityLocation } from "../models/city-location";
import { WeatherLocation } from "../models/weather-location";

export class Convert {

    public static GetLocationList(data: any): Array<CityLocation> {
        if (!data)
            return [];

        const locations: Array<CityLocation> = [];
        data.forEach((location: CityLocation) => {
            const newLocation = new CityLocation();
            newLocation.fromServer(location);
            locations.push(newLocation);
        });

        return locations;
    }

    public static GetWeather(data: any): WeatherLocation {
        if (!data)
            return;

        const newWeather = new WeatherLocation();
        newWeather.fromServer(data[0]);

        return newWeather;
    }

    public static GetDaily(data: any): Array<DailyForecasts> {
        if (!data.DailyForecasts)
            return [];

        const dailyForecasts: Array<DailyForecasts> = [];
        data.DailyForecasts.forEach((daily: DailyForecasts) => {
            const newDaily = new DailyForecasts();
            newDaily.fromServer(daily);
            dailyForecasts.push(newDaily);
        });

        return dailyForecasts;
    }

    public static GetCurrnetLocation(data: any): CityLocation {
        if (!data)
            return;

        const currentLocation = new CityLocation();
        currentLocation.fromServer(data);

        return currentLocation;
    }
}