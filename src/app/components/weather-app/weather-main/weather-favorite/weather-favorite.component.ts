import { WeatherService } from 'src/app/services/weather.service';
import { Component } from '@angular/core';

export type WeatherFavorite = { id: string, name: string, degrees: number, weatherDesc: string, isFavorite: boolean }

@Component({
    selector: 'weather-favorite',
    templateUrl: './weather-favorite.component.html',
    styleUrls: ['./weather-favorite.component.scss']
})
export class WeatherFavoriteComponent{

    _favoriteCards: Array<WeatherFavorite> = [];

    constructor(_weatherService: WeatherService) {
        this._favoriteCards = _weatherService.WeatherFavoriteList;
    }
}
