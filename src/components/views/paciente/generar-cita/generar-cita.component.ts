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
           Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Error al registrar el paciente!"
                    });
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

  }
  verHistorialCitas() {

    this.router.navigate(['paciente/historialCita'], { queryParams: { id: sessionStorage.getItem('usuarioid') } });

}}
