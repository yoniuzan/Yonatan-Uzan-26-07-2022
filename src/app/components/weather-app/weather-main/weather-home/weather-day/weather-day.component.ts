import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/common/constants';
import { Enums } from 'src/app/common/enums';
import { DailyForecasts } from 'src/app/models/dailyForecasts';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
    selector: 'weather-day',
    templateUrl: './weather-day.component.html',
    styleUrls: ['./weather-day.component.scss']
})
export class WeatherDayComponent implements OnInit {

    @Input('item') _item: DailyForecasts;

    public enums = Enums;
    public _dayName: string;
    public _isDayTime:boolean;
    public _tempType: Enums.Degrees = Enums.Degrees.Celsius;
    private _subscriptions: Array<Subscription>;

    constructor(private _weatherService: WeatherService) {
        this._isDayTime = this._weatherService.IsDayTime;
        this.registerEvents();
    }

    private registerEvents(): void {

        const subscriptions: Array<Subscription> = [];

        subscriptions.push(this._weatherService.registerOnChangeTemp().subscribe((res: Enums.Degrees) => {
            this._tempType = res;
        }));

        this._subscriptions = subscriptions;
    }

    ngOnInit(): void {
        const newDate = new Date(this._item.Date);
        this._dayName = Constants.Date.days[newDate.getDay()];
    }

    private clearSubscriptions(): void {
        this._subscriptions.forEach((sub) => sub.unsubscribe());
        this._subscriptions = [];
    }

    ngOnDestroy(): void {
        this.clearSubscriptions();
    }

}
