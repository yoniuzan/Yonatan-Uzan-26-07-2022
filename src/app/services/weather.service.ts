import { AlertService } from './alert.service';
import { WeatherLocation } from '../models/weather-location';
import { Enums } from 'src/app/common/enums';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpService } from './http.service';
import { Api } from '../common/api';
import { CityLocation } from '../models/city-location';
import { Convert } from '../common/convert';
import { DailyForecasts } from '../models/dailyForecasts';
import { WeatherFavorite } from '../components/weather-app/weather-main/weather-favorite/weather-favorite.component';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    private _themeSubject: Subject<Enums.Theme>;
    private _tabSubject: Subject<Enums.WeatherTab>;
    private _searchLocations: Array<CityLocation> = [];
    private _selectedLocation: CityLocation;

    private _selectedLocationSubject: Subject<WeatherLocation>;
    private _selectedWeather: WeatherLocation;

    private _nextDailyForecastsSubject: Subject<Array<DailyForecasts>>;
    private _nextDailyForecasts: Array<DailyForecasts>;

    private _isFinishInit: boolean = false;

    private _tempType: Enums.Degrees = Enums.Degrees.Celsius;

    private _isDayTime: boolean;
    
    private _tempTypeSubject: Subject<Enums.Degrees>;
    private _weatherFavoriteList: Array<WeatherFavorite> = [];

    constructor(private http: HttpService, private alertService: AlertService) {
        this._tabSubject = new Subject();
        this._selectedLocationSubject = new Subject();
        this._nextDailyForecastsSubject = new Subject();
        this._tempTypeSubject = new Subject();
        this._themeSubject = new Subject();
    }

    public registerOnSelectTab(): Observable<Enums.WeatherTab> {
        return this._tabSubject.asObservable();
    }

    public registerOnSelectWeather(): Observable<WeatherLocation> {
        return this._selectedLocationSubject.asObservable();
    }

    public registerOnDailyForecasts(): Observable<Array<DailyForecasts>> {
        return this._nextDailyForecastsSubject.asObservable();
    }

    public registerOnChangeTemp(): Observable<Enums.Degrees> {
        return this._tempTypeSubject.asObservable();
    }

    public registerOnToggleTheme(): Observable<Enums.Theme> {
        return this._themeSubject.asObservable();
    }

    public set FinishInit(isFinish: boolean) {
        this._isFinishInit = isFinish;
    }

    public get IsFinishInit(): boolean {
        return this._isFinishInit;
    }

    public get Locations(): Array<CityLocation> {
        return this._searchLocations;
    }

    public get SelectedLocation(): CityLocation {
        return this._selectedLocation;
    }

    public get SelectedWeather(): WeatherLocation {
        return this._selectedWeather;
    }

    public get NextDailyForecasts(): Array<DailyForecasts> {
        return this._nextDailyForecasts;
    }

    public get WeatherFavoriteList(): Array<WeatherFavorite> {
        return this._weatherFavoriteList;
    }

    public get TempType(): Enums.Degrees {
        return this._tempType;
    }

    public get IsDayTime(): boolean {
        return this._isDayTime;
    }

    public onToggleTheme(theme: Enums.Theme): void {
        this._themeSubject.next(theme)
    }

    public onSelectTab(tab: Enums.WeatherTab) {
        this._tabSubject.next(tab);
    }

    public searchCity(text: string): Promise<void> {
        const data = {
            apikey: 'Ku0wKPW9dch04JWO8LZuGC3E9xz0MdtF',
            q: text
        }

        // const dev = new CityLocation()
        // dev.Id = "215854";
        // dev.Name = "Tel Aviv";
        // this._selectedLocation = dev;
        // this._searchLocations = [dev];        
        // return;

        return this.http.get(Api.Weather.Search, data, Convert.GetLocationList).then(async (res: Array<CityLocation>) => {
            if (text == 'Tel Aviv') {
                this._selectedLocation = res[0];
                this._isFinishInit = true;
            }

            this._searchLocations = res;
        }, (err) => {
            this.alertService.error('Failed!', 'There is a problem finding a city location, please try again later');
        });
    }

    public getWeatherSelect(locationId: string): Promise<void> {
        const data = {
            apikey: 'Ku0wKPW9dch04JWO8LZuGC3E9xz0MdtF'
        }

        // const dev = new WeatherLocation()
        // dev.ImperialTemperature = 82;
        // dev.WeatherText = "Mostly clear";
        // dev.IsDayTime = false;
        // dev.IsFavorite = false;
        // this._isDayTime = dev.IsDayTime
        // this._selectedWeather = dev;
        // this._selectedLocationSubject.next(dev)
        // return;


        return this.http.get(Api.Weather.WeatherLocation + locationId, data, Convert.GetWeather).then((res: WeatherLocation) => {
            this._selectedWeather = res;
            this._isDayTime = res.IsDayTime;
            this._selectedLocation = this._searchLocations.find(item => item.Id == locationId);
            this._selectedLocationSubject.next(res);
        }, (err) => {
            this.alertService.error('Failed!', 'There is a problem with the weather you selected, please try again later');
        });
    }

    public dailyForecasts(locationId: string): Promise<void> {
        const data = {
            apikey: 'Ku0wKPW9dch04JWO8LZuGC3E9xz0MdtF'
        }

        // const arr: Array<DailyForecasts> = [];
        // for (let index = 0; index < 5; index++) {
        //     const element: DailyForecasts = new DailyForecasts();
        //     element.Date = new Date("2022-07-30T07:00:00+03:00");
        //     element.DayDescription = "Sunny";
        //     element.MaxTemperature = 92;
        //     element.MinTemperature = 74;
        //     element.NightDescription = "Mostly clear";
        //     arr.push(element);
        // }
        // this._nextDailyForecasts = arr;
        // this._nextDailyForecastsSubject.next(arr);
        // return;

        return this.http.get(Api.Weather.Daily + locationId, data, Convert.GetDaily).then((res: Array<DailyForecasts>) => {
            this._nextDailyForecasts = res;
            this._nextDailyForecastsSubject.next(res)
        }, (err) => {
            this.alertService.error('Failed!', 'We can\'t get the weather for the next few days, please try again later');
        });
    }


    addToFavorite(newLocation: WeatherFavorite) {
        this._weatherFavoriteList.push(newLocation);

        this.alertService.success('Great!', newLocation.name + ' ' + 'has been added to favorites');
    }

    removeFromFavorite(cityId: string) {
        this._weatherFavoriteList = this._weatherFavoriteList.filter(item => item.id != cityId);
    }

    changeTempType(tempType: Enums.Degrees): void {
        this._tempType = tempType;
        this._tempTypeSubject.next(tempType);
    }

    currentLocation(position: { lat: number; lon: number; }) {
        const data = {
            apikey: 'Ku0wKPW9dch04JWO8LZuGC3E9xz0MdtF',
            q: `${position.lat},${position.lon}`
        }

        return this.http.get(Api.Weather.CurrentLocation, data, Convert.GetCurrnetLocation).then((res: CityLocation) => {
            this._isFinishInit = true;
            this._selectedLocation = res;
            this._searchLocations = [res];

        }, (err) => {
            this.alertService.error('Failed!', 'There is a problem finding your current location, please try again later');
        });
    }
}
