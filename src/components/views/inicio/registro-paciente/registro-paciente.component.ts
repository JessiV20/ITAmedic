import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompartidosModule } from '../../../modules/compartidos.module';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 


@Component({
  selector: 'app-registro-paciente',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, CompartidosModule ],
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.css']
})
export class RegistroPacienteComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private location: Location) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      sexo: ['', Validators.required],
      peso: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      edad: ['', Validators.required],
      altura: ['', Validators.required],
      alergias: ['', Validators.required],
      tipo_sangre: ['', Validators.required],
      enfermedad: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const datos = this.registroForm.value;
  
      this.api.insertarDatos('inicio/registroPaciente', datos).subscribe({
        next: (response) => {

          console.log('Registro exitoso', response);
          Swal.fire({
            title: "Registrado Correctamente!",
            icon: "success",
            draggable: true,
            timer: 3000,
            showConfirmButton: false 
          });
          this.location.back()
        },
        error: (error) => {
          console.error('Error al registrar el paciente', error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al registrar el paciente!"
          });
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
