import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherAppComponent } from './components/weather-app/weather-app.component';
import { WeatherHeaderComponent } from './components/weather-app/weather-header/weather-header.component';
import { WeatherMainComponent } from './components/weather-app/weather-main/weather-main.component';
import { WeatherFooterComponent } from './components/weather-app/weather-footer/weather-footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WeatherDayComponent } from './components/weather-app/weather-main/weather-home/weather-day/weather-day.component';
import { WeatherHomeComponent } from './components/weather-app/weather-main/weather-home/weather-home.component';
import { WeatherFavoriteComponent } from './components/weather-app/weather-main/weather-favorite/weather-favorite.component';
import { FavoriteCardComponent } from './components/weather-app/weather-main/weather-favorite/favorite-card/favorite-card.component';
import { HttpClientModule } from '@angular/common/http';
import { TemperatureConvertPipe } from './pipes/temperature-convert.pipe';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    WeatherAppComponent,
    WeatherHeaderComponent,
    WeatherMainComponent,
    WeatherFooterComponent,
    WeatherDayComponent,
    WeatherHomeComponent,
    WeatherFavoriteComponent,
    FavoriteCardComponent,
    TemperatureConvertPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    NgbModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
