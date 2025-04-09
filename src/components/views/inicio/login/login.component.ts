import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompartidosModule } from '../../../modules/compartidos.module';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  imports: [CompartidosModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  tipoUsuario: string | null = null;
  usuarioMedico: any = {}; 
  usuarioLogueado: any = {}; 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
   
  ) {}

  ngOnInit() {
    this.tipoUsuario = this.route.snapshot.paramMap.get('tipo');
    console.log('Tipo de usuario:', this.tipoUsuario);
    this.loginForm = this.fb.group({
      correo: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      const datos = {
        tipo: this.tipoUsuario,
        ...this.loginForm.value
      };

      this.api.consultaDatosPost('inicio/login', datos).subscribe({
        next:(response) =>{
          this.usuarioLogueado = response.paciente || response.medico || response.administrativo;
          if( this.tipoUsuario=='paciente'){
          console.log( this.usuarioLogueado?.idpaciente)
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('usuarioid',   this.usuarioLogueado?.idpaciente);
            sessionStorage.setItem('nombreusuario',  this.usuarioLogueado?.nombre);
            this.router.navigate(['paciente/generarCita']);
          }}
        
          else if( this.tipoUsuario=='medico'){
            console.log('Medico Logeado', this.usuarioLogueado?.idmedico)
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('usuarioid',   this.usuarioLogueado?.idmedico);
              sessionStorage.setItem('username',  this.usuarioLogueado?.username);
              this.router.navigate(['medico/VistaGeneralMedicosComponent']);
            }
          }
          else if( this.tipoUsuario=='administrativo'){
            console.log('numero', this.usuarioLogueado)
            if(this.usuarioLogueado?.rol_idrol ==1){
            console.log('Administrativo Logeado citas', this.usuarioLogueado?.id_administrativo)
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('usuarioid',   this.usuarioLogueado?.id_administrativo);
              sessionStorage.setItem('username',  this.usuarioLogueado?.username);
              this.router.navigate(['administrativo/citasProgramadas']);
            }
            }
           else if(this.usuarioLogueado?.rol_idrol ==2){
              console.log('Administrativo Logeado inventario', this.usuarioLogueado?.id_administrativo)
              if (typeof window !== 'undefined') {
                sessionStorage.setItem('usuarioid',   this.usuarioLogueado?.id_administrativo);
                sessionStorage.setItem('username',  this.usuarioLogueado?.username);
                this.router.navigate(['administrativo/GestionInventario']);
              }
              }
             else if(this.usuarioLogueado?.rol_idrol ==3){
                console.log('Administrativo Logeado general', this.usuarioLogueado?.id_administrativo)
                if (typeof window !== 'undefined') {
                  sessionStorage.setItem('usuarioid',   this.usuarioLogueado?.id_administrativo);
                  sessionStorage.setItem('username',  this.usuarioLogueado?.username);
                  this.router.navigate(['administrativo/VistaGeneralAdministrativo']);
                }
                }
          }
        },
        error:(error) =>{
 Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Usuario no registrado!"
          });
        }
      })

      
      console.log('Datos para login:', datos);

    }
  }
}
