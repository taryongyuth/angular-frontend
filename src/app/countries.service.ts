import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  private RESTCOUNTRIES_API = "https://restcountries.eu/rest/v2/all";

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest() {
    return this.httpClient.get(this.RESTCOUNTRIES_API).pipe(retry(3), catchError(this.handleError));
  }
}
