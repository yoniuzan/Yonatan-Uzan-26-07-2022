import { Enums } from 'src/app/common/enums';
import { DailyForecasts } from './../../../../models/dailyForecasts';
import { WeatherLocation } from './../../../../models/weather-location';
import { WeatherService } from 'src/app/services/weather.service';
import { CityLocation } from '../../../../models/city-location';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, mergeMap, toArray, mergeAll } from 'rxjs/operators';
import { WeatherFavorite } from '../weather-favorite/weather-favorite.component';

@Component({
    selector: 'weather-home',
    templateUrl: './weather-home.component.html',
    styleUrls: ['./weather-home.component.scss']
})
export class WeatherHomeComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild("filter") filter: ElementRef;
    public enums = Enums;
    public _searchCity: string;
    public _locationList: Array<CityLocation> = [];
    public _isEmpty: boolean = false;
    public _data$: Observable<CityLocation[]>;

    public _cityLocation: CityLocation;
    public _weatherToShow: WeatherLocation;
    public _nextWeatherDayes: Array<DailyForecasts> = [];
    public _tempType: Enums.Degrees;

    private _keySubcscription: Subscription;
    private _subscriptions: Array<Subscription>;

    constructor(private _weatherService: WeatherService) {
        this._data$ = of([]);
        this._weatherToShow = this._weatherService.SelectedWeather;
        this._tempType = this._weatherService.TempType;
        this.registerEvents();
    }

    private registerEvents(): void {
        const subscriptions: Array<Subscription> = [];

        subscriptions.push(this._weatherService.registerOnSelectWeather().subscribe((res: WeatherLocation) => {
            this._weatherToShow = res;
            this._cityLocation = this._weatherService.SelectedLocation;
            this._weatherToShow.IsFavorite = this._weatherService.WeatherFavoriteList.find(item => item.id == this._cityLocation.Id) ? true : false;
        }));

        subscriptions.push(this._weatherService.registerOnDailyForecasts().subscribe((res: Array<DailyForecasts>) => {
            this._nextWeatherDayes = res;
        }));

        subscriptions.push(this._weatherService.registerOnChangeTemp().subscribe((res: Enums.Degrees) => {
            this._tempType = res;
        }));

        this._subscriptions = subscriptions;
    }

    ngOnInit(): void {
        if (!this._weatherService.IsFinishInit)
            return;

        this._weatherToShow = this._weatherService.SelectedWeather;
        this._cityLocation = this._weatherService.SelectedLocation;
        this._nextWeatherDayes = this._weatherService.NextDailyForecasts;
    }

    ngAfterViewInit(): void {
        this._keySubcscription = fromEvent(this.filter.nativeElement, 'keyup')
            .pipe(
                debounceTime(500),
                map((event: Event) => (<HTMLInputElement>event.target).value),
                map(value => this._weatherService.searchCity(value)),
                mergeAll()
            )
            .subscribe(() => {
                this._locationList = this._weatherService.Locations;
                this._data$ = of(this._locationList).pipe(
                    mergeMap(x => x),
                    distinctUntilChanged(),
                    toArray(),
                );

                this._data$.subscribe(res => {
                    this._isEmpty = res.length <= 0;
                });
            })
    }

    public async onItemSelect(cityLocation: CityLocation): Promise<void> {
        if (this._cityLocation.Name == cityLocation.Name)
            return;

        await this._weatherService.getWeatherSelect(cityLocation.Id);
        await this._weatherService.dailyForecasts(cityLocation.Id);

        this._isEmpty = true;
    }

    public add(cityId: string): void {
        const newLocation: WeatherFavorite = {
            id: cityId,
            name: this._cityLocation.Name,
            degrees: this._weatherToShow.ImperialTemperature,
            weatherDesc: this._weatherToShow.WeatherText,
            isFavorite: true
        }

        this._weatherService.addToFavorite(newLocation);
        this._weatherToShow.IsFavorite = !this._weatherToShow.IsFavorite;
    }

    public remove(cityId: string): void {
        this._weatherService.removeFromFavorite(cityId);
        this._weatherToShow.IsFavorite = !this._weatherToShow.IsFavorite;
    }

    public changeTemp(tempType: Enums.Degrees): void {
        const newTemp = tempType == Enums.Degrees.Celsius ? Enums.Degrees.Fahrenheit : Enums.Degrees.Celsius;
        this._weatherService.changeTempType(newTemp);
    }

    private clearSubscriptions(): void {
        this._subscriptions.forEach((sub) => sub.unsubscribe());
        this._subscriptions = [];
    }

    ngOnDestroy(): void {
        this._keySubcscription.unsubscribe();
        this.clearSubscriptions();
    }

}
