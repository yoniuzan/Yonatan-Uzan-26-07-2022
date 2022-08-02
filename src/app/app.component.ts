import { WeatherService } from 'src/app/services/weather.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Enums } from './common/enums';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
    title = 'weather-project';
    private _subscriptions: Array<Subscription>;

    constructor(private _weatherService: WeatherService) {
        this.registerEvents();
    }

    private registerEvents(): void {
        const subscriptions: Array<Subscription> = [];

        subscriptions.push(this._weatherService.registerOnToggleTheme().subscribe((theme: Enums.Theme) => {
            document.body.classList.toggle('dark-theme');
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
