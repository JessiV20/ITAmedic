import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../services/api.service';
import { CompartidosModule } from '../../../modules/compartidos.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas-programadas',
  imports: [CompartidosModule],
  templateUrl: './citas-programadas.component.html',
  styleUrl: './citas-programadas.component.css'
})
export class CitasProgramadasComponent {
  usuarioId: number = 0;
  citasActualizadas: any[] = [];
  listaMedicos: any[] = [];
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['idcitas', 'nombrePaciente', 'nombreMedico', 'fecha','motivo', 'estatus', 'acciones'];
constructor(private apiService: ApiService) {
  
  }
ngOnInit() {
this.consultarCitasProgramadas();
this.consularMedicos();
}

consultarCitasProgramadas() {
  this.apiService.consultaDatos('admins/consultarCitasProgramadas' ).subscribe((response: any) => {
    if (response) {
      console.log('Citas programadas:', response);
      this.dataSource.data = response.resultado;
    } else {
      console.error('Error al consultar las citas programadas:', response.message);
    }
  });}


  consularMedicos() {
    this.apiService.consultaDatos('admins/consultarMedicos').subscribe((response: any) => {
      if (response) {
        console.log('Medicos:', response);
        this.listaMedicos = response.resultado;
      } else {
        console.error('Error al consultar los medicos:', response.message);
      }
    });
  }
  guardarDatosMedico(element: any) {
    element.idmedico = element.idmedico;
   const datos= this.dataSource.data.filter((item:any)=> item.idcitas === element.idcitas);
    console.log('Datos del medico:', datos);
   const medicoSeleccionado = this.listaMedicos.find((medico:any) => medico.idmedico === element.idmedico);
    console.log('Medico seleccionado:', medicoSeleccionado);

  }

  guardarCambios(){
    this.citasActualizadas = this.dataSource.data.filter((item:any) => item.idmedico !== item.idmedico);
    this.citasActualizadas.forEach(element => {
      element.idmedico = element.idmedico;
     
    });
console.log('Citas actualizadas:', this.citasActualizadas);
    if (this.citasActualizadas.length > 0) {
    this.apiService.modificarDatos('admins/guardarCambiosCitasProgramadas', this.citasActualizadas).subscribe((response: any) => {
      if (response) {
        console.log('Cambios guardados:', response);
        this.consultarCitasProgramadas(); 
      } else {
        console.error('Error al guardar los cambios:', response.message);
      }
    });
  }
  else {
    Swal.fire({
     icon: 'info',
     title: 'No hay cambios para guardar',
     showConfirmButton: false,
     timer: 1500
   });
   }}

}
