import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface a {
    column: any[];
    data: any[];
}

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(protected http: HttpClient) { }

    private transformArrayToObj<T>(obj: a[]): Observable<T> {
        const rows: any = [];
        // empty row object
        const objData: any = {};
        obj[0].column.map(col => objData[col] = '');

        obj[0].data.forEach(rowData => {
            const aa = { ...objData };
            Object.keys(objData).forEach((key, index) => aa[key] = rowData[index]);
            rows.push(aa);
        });
        return of(rows);
    }

    // get<T>(url: string): Observable<T> {
    //     return this.http.get<T>(environment.apiURL + url).pipe(
    //         map((data) => {
    //             localStorage.setItem(url, JSON.stringify(data));
    //             return data;
    //         })
    //     );
    // }


    get<T>(url: string, getOfflineData = false): Observable<T> {

        if (getOfflineData) {
            return of(JSON.parse(localStorage.getItem(url)) as T);
        }

        return this.http.get<a[]>(environment.apiURL + url).pipe(
            switchMap((data) =>
                this.transformArrayToObj<T>(data).pipe(
                    map(result => {
                        localStorage.setItem(url, JSON.stringify(result));
                        return result;
                    }))
            ),
            catchError((error) => {
                return of(JSON.parse(localStorage.getItem(url)) as T);
            }),
        );
    }


    post<T, K>(url: string, data: T): Observable<K> {
        return this.http.post<K>(environment.apiURL + url, data)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // Return an observable with a user-facing error message.
        return throwError(
            'Something bad happened; please try again later.');
    }
}
