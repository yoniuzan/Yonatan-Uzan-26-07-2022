import { Component, OnInit } from '@angular/core';
import { Enums } from 'src/app/common/enums';
import { WeatherService } from 'src/app/services/weather.service';

export type Tab = { type: Enums.WeatherTab ,name: string, selected: boolean }

@Component({
    selector: 'weather-header',
    templateUrl: './weather-header.component.html',
    styleUrls: ['./weather-header.component.scss']
})
export class WeatherHeaderComponent implements OnInit {
    public enums = Enums;
    _tabs: Array<Tab>
    _theme: Enums.Theme = Enums.Theme.Light;

    constructor( private _weatherService: WeatherService) {
        this.initTabs();
    }

    ngOnInit(): void {
    }

    private initTabs(): void {
        this._tabs = [
            {
                type: Enums.WeatherTab.Home,
                name: 'Home',
                selected: true
            },
            {
                type: Enums.WeatherTab.Favorite,
                name: 'Favorite',
                selected: false
            }
        ]
    }

    public onSwitch(selectedtab: Tab): void {
        if (selectedtab.selected)
            return;

        const prevTab = this._tabs.find(tab => tab.selected);
        prevTab.selected = !prevTab.selected;
        selectedtab.selected = !selectedtab.selected;

        this._weatherService.onSelectTab(selectedtab.type);

    }

    toggleDarkTheme(status: { checked: boolean }): void {
        const theme = status.checked ? Enums.Theme.Dark : Enums.Theme.Light;
        this._weatherService.onToggleTheme(theme);
    }
}
