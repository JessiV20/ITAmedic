import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {Cita} from '../views/medico/vista-general-medicos/vista-general-medicos.component'
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api = "http://localhost:4300/api/";

  constructor(private http: HttpClient, private router: Router) { }

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

  // Métodos específicos para citas (manteniendo compatibilidad)
  consultaDatos(endpoint: string): Observable<any> {
    return this.get(endpoint);
  }

  consultaDatosPost(endpoint: string, datos: any): Observable<any> {
    return this.post(endpoint, { datos });
  }

  insertarDatos(endpoint: string, datos: any): Observable<any> {
    return this.post(endpoint, { datos });
  }

  modificarDatos(endpoint: string, datos: any): Observable<any> {
    return this.put(endpoint, { datos });
  }

  EliminarDatosPut(endpoint: string, datos: any): Observable<any> {
    return this.put(endpoint, { datos });
  }

  eliminarDatos(endpoint: string): Observable<any> {
    return this.delete(endpoint);
  }

  sesion(datos: any): Observable<any> {
    return this.post('login', datos);
  }

  // Métodos mejorados para citas
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

actualizarEstadoCita(idCita: number, nuevoEstado: string): Observable<any> {
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