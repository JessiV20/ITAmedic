import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap, Observable, throwError } from 'rxjs';
import  { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api = "http://localhost:4300/api/";

  constructor(private http: HttpClient, @Inject(Router) public router: Router) { }

  consultaDatos(endpoint: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    
    const resultado = this.http.get(this.api + endpoint, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorM = "";
        if (error.error instanceof HttpErrorResponse) {
          errorM = `Error: ${error.error.message}`;
        } else {
          errorM = `Error code: ${error.status}, message: ${error.message}`;
        }
        return throwError(() => errorM);
      })
    );
    return resultado;
  }

  eliminarDatos(endpoint: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    
    const resultado = this.http.delete(this.api + endpoint, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorM = "";
        if (error.error instanceof HttpErrorResponse) {
          errorM = `Error: ${error.error.message}`;
        } else {
          errorM = `Error code: ${error.status}, message: ${error.message}`;
        }
        return throwError(() => errorM);
      })
    );
    return resultado;
  }

  consultaDatosPost(endpoint: string, datos: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    const body = { datos: datos };

    const resultado = this.http.post(this.api + endpoint, body, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorM = "";
        if (error.error instanceof HttpErrorResponse) {
          errorM = `Error: ${error.error.message}`;
        } else {
          errorM = `Error code: ${error.status}, message: ${error.message}`;
        }
        return throwError(() => errorM);
      })
    );
    return resultado;
  }

  insertarDatos(endpoint: string, datos: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    const body = { datos: datos };

    const resultado = this.http.post(this.api + endpoint, body, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorM = "";
        if (error.error instanceof HttpErrorResponse) {
          errorM = `Error: ${error.error.message}`;
        } else {
          errorM = `Error code: ${error.status}, message: ${error.message}`;
        }
        return throwError(() => errorM);
      })
    );
    return resultado;
  }

  modificarDatos(endpoint: string, datos: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    const body = { datos: datos };

    const resultado = this.http.put(this.api + endpoint, body, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorM = "";
        if (error.error instanceof HttpErrorResponse) {
          errorM = `Error: ${error.error.message}`;
        } else {
          errorM = `Error code: ${error.status}, message: ${error.message}`;
        }
        return throwError(() => errorM);
      })
    );
    return resultado;
  }

  EliminarDatosPut(endpoint: string, datos: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    const body = { datos: datos };

    const resultado = this.http.put(this.api + endpoint, body, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorM = "";
        if (error.error instanceof HttpErrorResponse) {
          errorM = `Error: ${error.error.message}`;
        } else {
          errorM = `Error code: ${error.status}, message: ${error.message}`;
        }
        return throwError(() => errorM);
      })
    );
    return resultado;
  }

  sesion(datos: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    const body = datos;
    return this.http.post(this.api + 'login', body, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorM = "";
        if (error.error instanceof HttpErrorResponse) {
          errorM = `Error: ${error.error.message}`;
        } else {
          errorM = `Error code: ${error.status}, message: ${error.message}`;
        }
        return throwError(() => errorM);
      })
    );
  }
}
