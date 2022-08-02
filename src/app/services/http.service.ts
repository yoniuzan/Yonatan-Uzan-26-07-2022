import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private _http: HttpClient) {
    }

    private getParams(data: any): string {
        if (Object.keys(data).length == 0)
            return '';

        return '?' + Object.keys(data).map(key => `${key}=${data[key]}`).join('&');
    }

    /*
    *  relativePath: url
    *  data: input data to Api
    *  convert: method that parsing json to stroing typed object
    *  extraData: extra data for the Object
    * */
    public async get<T>(relativePath: string, data: any, convert: (da: any, ex?: any) => T, extraData?: any, silent = false) {

        // defaults
        data = Object.keys(data).length == 0 ? {} : data;
        convert = convert ? convert : function (data) {
            return data;
        };

        // build request payload and headers
        const completePath = `${environment.Server}${relativePath}${this.getParams(data)}`;
        let headers = new HttpHeaders();

        try {
            return this._http.get(completePath, { headers: headers })
                .pipe(
                    map((res: any) => {
                        try {
                            return convert(res);
                        }
                        catch (e) {
                            throw e;
                        }

                    }),
                    catchError((err) => {
                        return err;

                    }))
                .toPromise();
        } catch (e) {
            throw e;;
        }
    }
}
