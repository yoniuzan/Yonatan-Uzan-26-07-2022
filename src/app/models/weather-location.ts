export class WeatherLocation {
    public WeatherText: string;
    public IsDayTime: boolean;
    public ImperialTemperature: number;
    public IsFavorite: boolean;

    public fromServer(other: any): void {
        this.WeatherText = other.WeatherText ?? 'Sunny';
        this.IsDayTime = other.IsDayTime ?? 'true';
        this.ImperialTemperature = other.Temperature.Imperial.Value ?? 94;
        this.IsFavorite = false;
    }
}