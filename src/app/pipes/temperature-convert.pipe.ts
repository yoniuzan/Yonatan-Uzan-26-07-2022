import { Pipe, PipeTransform } from '@angular/core';
import { Enums } from '../common/enums';

@Pipe({
    name: 'temperatureConvert'
})
export class TemperatureConvertPipe implements PipeTransform {

    transform(degrees: number, ...args: unknown[]): string {
        const type: Enums.Degrees = arguments[1];

        switch (type) {
            case Enums.Degrees.Celsius:
                return ((5 / 9) * (degrees - 32)).toFixed(1).toString() + 'º c';
            case Enums.Degrees.Fahrenheit:
                return degrees.toFixed(1).toString() + 'º f';
            default:
                return ((5 / 9) * (degrees - 32)).toFixed(1).toString() + 'º c';
        }
    }

}
