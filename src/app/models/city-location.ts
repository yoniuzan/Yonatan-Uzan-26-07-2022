export class CityLocation {
    public Id: string;
    public Name: string;

    public fromServer(other: any): void {
        this.Id = other.Key;
        this.Name = other.LocalizedName;
    }
}