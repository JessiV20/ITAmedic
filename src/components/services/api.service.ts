import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap, Observable, throwError } from 'rxjs';
import  { Router } from '@angular/router'
import { Admin, Role } from '../models/admin.model'

import {Cita} from '../views/medico/vista-general-medicos/vista-general-medicos.component'
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api = "http://localhost:4300/api/";

  constructor(private http: HttpClient, @Inject(Router) public router: Router) { }

   private handleError(error: HttpErrorResponse) {
    console.error('Error en la API:', {
      status: error.status,
      message: error.message,
      url: error.url,
      errorDetails: error.error
    });

    // Manejo específico de errores de autenticación
    if (error.status === 401 || error.status === 403) {
      this.router.navigate(['/login']);
    }

    return throwError(() => ({
      status: error.status,
      message: error.error?.message || 'Error en el servidor',
      details: error.error
    }));
  }

  // Métodos genéricos
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  get(endpoint: string): Observable<any> {
    return this.http.get(this.api + endpoint, { headers: this.createHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(this.api + endpoint, data, { headers: this.createHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  put(endpoint: string, data: any): Observable<any> {
    return this.http.put(this.api + endpoint, data, { headers: this.createHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(this.api + endpoint, { headers: this.createHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
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


  getAdmins(): Observable<Admin[]> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
      return this.http.get<Admin[]>(this.api+'admins/admins');
    }
  
    getRoles(): Observable<Role[]> {
      const headers = new HttpHeaders().set('Content-type', 'application/json');
      return this.http.get<Role[]>(this.api+'admins/roles');
    }
  
    updateRole(adminId: number, roleId: number): Observable<any> {
      const headers = new HttpHeaders().set('Content-type', 'application/json');
      const body = { role_id: roleId };
      return this.http.put(this.api+`admins/admins/${adminId}/role`, body,{ headers });
    }
     obtenerCitasMedico(idmedico: string): Observable<any> {
    return this.get(`citas/medico/${idmedico}`);
  }

  private getToken(): string {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (!token) {
      console.warn('No se encontró token de autenticación');
      return '';
    }
    return token;
  }

actualizarEstadoCita(idCita: number, nuevoEstado: number): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.getToken()}`
  });

  return this.http.put(`${this.api}citas/${idCita}/estado`, {
    estado: nuevoEstado
  }, { headers }).pipe(
    catchError(error => {
      console.error('Error en actualizarEstadoCita:', error);
      return throwError(() => error);
    })
  );
}

  consultaDatosmedico(endpoint: string): Observable<any> {
    return this.get(endpoint);
  }

  modificarDatosmedico(endpoint: string, datos: any): Observable<any> {
    return this.put(endpoint, datos);
  }
 actualizarDatosPacienteCita(cita: any): Observable<any> {
  // Asegúrate que los nombres de campos coincidan exactamente con el backend
  const payload = {
    idcitas: cita.idcitas,  // Este nombre debe coincidir con el esperado por el backend
    paciente_nombre: cita.paciente_nombre,
    paciente_edad: Number(cita.paciente_edad), // Asegura que es número
    paciente_sexo: cita.paciente_sexo,
    paciente_peso: Number(cita.paciente_peso),
    paciente_altura: Number(cita.paciente_altura),
    motivo: cita.motivo
  };

  console.log('Enviando datos al servidor:', payload); // Para depuración

  return this.http.put(`${this.api}citas/actualizar-datos-paciente`, payload).pipe(
    catchError(error => {
      console.error('Error detallado:', {
        status: error.status,
        message: error.message,
        error: error.error  // Esto muestra el mensaje del servidor
      });
      return throwError(() => error);
    })
  );
}
}
