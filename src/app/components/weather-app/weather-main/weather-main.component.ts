import { AlertService } from './../../../services/alert.service';
import { WeatherLocation } from '../../../models/weather-location';
import { WeatherService } from 'src/app/services/weather.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Enums } from 'src/app/common/enums';

@Component({
    selector: 'weather-main',
    templateUrl: './weather-main.component.html',
    styleUrls: ['./weather-main.component.scss']
})
export class WeatherMainComponent implements OnInit, OnDestroy {

    public enums = Enums;

    _selectedTab: Enums.WeatherTab = Enums.WeatherTab.Home;
    _selectedWeather: WeatherLocation;
    _data: Observable<any[]>[] = [];

    private _subscriptions: Array<Subscription>;

    constructor(private _weatherService: WeatherService, private _alertService: AlertService) {        
        this.registerEvents();
    }

    private registerEvents(): void {
        const subscriptions: Array<Subscription> = [];

        subscriptions.push(this._weatherService.registerOnSelectTab().subscribe((tab: Enums.WeatherTab) => {
            this._selectedTab = tab;
        }));

        this._subscriptions = subscriptions;
    }

    ngOnInit(): void {
        this.initWithCurrentLocation();
    }

    private initWithCurrentLocation(): void {
        if (!navigator.geolocation) {
            this._alertService.error('Failed!', 'Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            const positiond: { lat: number, lon: number } = {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            }
            await this._weatherService.currentLocation(positiond);
            await this._weatherService.getWeatherSelect(this._weatherService.Locations[0].Id);
            await this._weatherService.dailyForecasts(this._weatherService.Locations[0].Id);
            this._weatherService.FinishInit = true;

        }, (err) => {
            this._alertService.error('Failed!', 'There is a problem to finding your current location, please try again later');
        })
    }

    private clearSubscriptions(): void {
        this._subscriptions.forEach((sub) => sub.unsubscribe());
        this._subscriptions = [];
    }

    ngOnDestroy(): void {
        this.clearSubscriptions();
    }

}
