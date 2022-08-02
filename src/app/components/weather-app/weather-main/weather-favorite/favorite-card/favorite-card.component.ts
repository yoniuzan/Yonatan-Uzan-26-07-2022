import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Enums } from 'src/app/common/enums';
import { WeatherService } from 'src/app/services/weather.service';
import { WeatherFavorite } from '../weather-favorite.component';

@Component({
    selector: 'favorite-card',
    templateUrl: './favorite-card.component.html',
    styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent {

    @Input('card') _card: WeatherFavorite;

    public enums = Enums;

    public _tempType: Enums.Degrees = Enums.Degrees.Celsius;
    private _subscriptions: Array<Subscription>;

    constructor(private _weatherService: WeatherService) { 
        this.registerEvents();
    }

    private registerEvents(): void {

        const subscriptions: Array<Subscription> = [];

        subscriptions.push(this._weatherService.registerOnChangeTemp().subscribe((res: Enums.Degrees) => {
            this._tempType = res;
        }));

        this._subscriptions = subscriptions;
    }

    private clearSubscriptions(): void {
        this._subscriptions.forEach((sub) => sub.unsubscribe());
        this._subscriptions = [];
    }

    ngOnDestroy(): void {
        this.clearSubscriptions();
    }
}
