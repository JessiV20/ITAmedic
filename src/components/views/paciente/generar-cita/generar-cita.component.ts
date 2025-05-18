import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CompartidosModule } from '../../../modules/compartidos.module';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generar-cita',
  templateUrl: './generar-cita.component.html',
  imports: [CompartidosModule],
  providers: [provideNativeDateAdapter()],
  styleUrls: ['./generar-cita.component.css']
})
export class GenerarCitaComponent {
  citaForm: FormGroup;
ValidarErrorMedico: boolean = false;
  constructor(private fb: FormBuilder, private http: HttpClient, private api: ApiService, private router: Router) {
    this.citaForm = this.fb.group({
      idpaciente: ['', Validators.required],
      fecha: ['', Validators.required],
      motivo: ['', Validators.required]
    });
  }

  guardarCita() {
    if (this.citaForm.valid) {
      const cita = this.citaForm.value;

     this.api.insertarDatos('paciente/insertarCita', cita).subscribe({
     
        next: (response) => {
          this.ValidarErrorMedico== false;
           Swal.fire({
                      title: "Cita Agendada!",
                      icon: "success",
                      draggable: true,
                      timer: 2000,
                      showConfirmButton: false 
                    });
          this.citaForm.patchValue({
            fecha: '',
            motivo: ''
          });
        },
        error: (error) => {
          this.ValidarErrorMedico=error.includes('405')
   
          console.log('Código de estado:', this.ValidarErrorMedico);
          console.error('Error al registrar la cita:', error); 
          console.log('Código de estado:', error.includes('405'));  
          if (this.ValidarErrorMedico=== true) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No hay médicos disponibles para la fecha seleccionada!"
            });
          }else{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Error al registrar la cita!"
            });
          }

        }
      });
    }
  }
  
  obtenerIdPaciente() {
    const idPaciente = sessionStorage.getItem('usuarioid');
    if (idPaciente) {
      this.citaForm.patchValue({ idpaciente: idPaciente });
    }
  }
  ngOnInit() {
    this.obtenerIdPaciente();
    this.ValidarErrorMedico== false;

  }
  verHistorialCitas() {

    this.router.navigate(['paciente/historialCita'], { queryParams: { id: sessionStorage.getItem('usuarioid') } });

}}
