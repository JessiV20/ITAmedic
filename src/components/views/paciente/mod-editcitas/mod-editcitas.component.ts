import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompartidosModule } from '../../../modules/compartidos.module';
import { MatNativeDateModule } from '@angular/material/core';



@Component({
  selector: 'app-mod-editcitas',
  imports: [CompartidosModule, MatNativeDateModule],
  templateUrl: './mod-editcitas.component.html',
  styleUrl: './mod-editcitas.component.css'
})
export class ModEditcitasComponent {
  citaForm!: FormGroup;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService, private dialogRef: MatDialogRef<any>, private fb: FormBuilder)
  {
    this.citaForm = this.fb.group({
      idcitas: [data.idcitas],
      nombrePaciente: [data.nombrePaciente],
      nombreMedico: [data.nombreMedico],
      fecha: [data.fecha],
      motivo: [data.motivo],
      estatus: [data.estatus],
    });
  }


    ngOnInit() {
        console.log('Datos recibidos en el diálogo:', this.data);
        
    }

     guardar() {
    const citaActualizada = this.citaForm.value;
    this.api.modificarDatos('paciente/actualizarCita', citaActualizada).subscribe({
      next: (response) => {
        console.log('Respuesta de la actualización:', response);
        this.dialogRef.close(citaActualizada);
      },
      error: (error) => {
        console.error('Error al actualizar la cita:', error);
      }
    });
 
    this.dialogRef.close(citaActualizada);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
