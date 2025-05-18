import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router'; 
import { MatTableDataSource } from '@angular/material/table';
import { CompartidosModule } from '../../../modules/compartidos.module';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModEditcitasComponent } from '../mod-editcitas/mod-editcitas.component';

@Component({
  selector: 'app-historial-cita',
  imports: [CompartidosModule, MatPaginator],
  templateUrl: './historial-cita.component.html',
  styleUrl: './historial-cita.component.css'
})
export class HistorialCitaComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  idPaciente: string | null = null;
  motivoCancelacion: string = '';
  displayedColumns: string[] = ['idcitas', 'nombrePaciente', 'nombreMedico', 'fecha','motivo', 'estatus', 'acciones'];
  dataSource = new MatTableDataSource<any>(); 
  constructor(private api: ApiService, private route: ActivatedRoute, private dialog: MatDialog) { }
  ngOnInit() {
    this.idPaciente = this.route.snapshot.queryParamMap.get('id');
    console.log('ID del paciente:', this.idPaciente);
    this.obtenerHistorialCitas();
  }
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}
  obtenerHistorialCitas() {
    this.api.consultaDatosPost('paciente/obtenerHistorialCitas', this.idPaciente ).subscribe({
      next: (response) => {
        this.dataSource.data = response.resultado; 
        console.log('Datos de citas:', this.dataSource.data);
        console.log('Historial de citas:', response);
      },
      error: (error) => {
        console.error('Error al obtener el historial de citas:', error);
      }
    });   
}
CancelarCita(id: any) {
  Swal.fire({
    title: '¿Motivo de Cancelacion?',
    input: 'text',
    inputPlaceholder: 'Escribe el motivo de cancelación',
    showCancelButton: true,
    confirmButtonText: 'Cancelar cita',
    cancelButtonText: 'Cancelar',
    preConfirm: (value) => {
      if (!value) {
        Swal.showValidationMessage('Por favor, ingresa un motivo de cancelación');
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      this.motivoCancelacion = result.value;
      console.log('Motivo de cancelación:', this.motivoCancelacion);
      id.motivo = this.motivoCancelacion;
      console.log('ID de la cita a cancelar:', id.idcitas);
    
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, cancelar cita'
  }).then((result) => {
    if (result.isConfirmed) {
      const datos = {
        idcitas: id.idcitas,
        motivoCancelacion: this.motivoCancelacion
      };
      console.log('ID de la cita a cancelar:', datos);
      this.api.modificarDatos('paciente/cancelarCita', datos).subscribe({
        next: (response) => {
          console.log('Respuesta de la cancelación:', response);
          this.obtenerHistorialCitas();
          Swal.fire(
            'Cancelado!',
            'La cita ha sido cancelada.',
            'success'
          );
        },
        error: (error) => {
          console.error('Error al cancelar la cita:', error);
        }
      });
    }
  }
  );
  }});
}




openDialog(id: number) {
    this.dialog.open(ModEditcitasComponent,
      {
    width: '100%',   
    maxWidth: '60vw',
        data:id
      }
    )
}
detallesCita(id: number) {}
motovoCancelacion(id: number) {}
}
