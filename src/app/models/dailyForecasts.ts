export class DailyForecasts {
    public Date: Date;
    public MinTemperature: number;
    public MaxTemperature: number;
    public DayDescription: string;
    public NightDescription: string;

    public fromServer(other: any): void {
        this.Date = other.Date;
        this.MinTemperature = other.Temperature.Minimum.Value;
        this.MaxTemperature = other.Temperature.Maximum.Value;
        this.DayDescription = other.Day.IconPhrase;
        this.NightDescription = other.Night.IconPhrase;
    }
}