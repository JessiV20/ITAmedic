import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router'; 
import { MatTableDataSource } from '@angular/material/table';
import { CompartidosModule } from '../../../modules/compartidos.module';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-historial-cita',
  imports: [CompartidosModule, MatPaginator],
  templateUrl: './historial-cita.component.html',
  styleUrl: './historial-cita.component.css'
})
export class HistorialCitaComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  idPaciente: string | null = null;
  displayedColumns: string[] = ['idcitas', 'nombrePaciente', 'nombreMedico', 'fecha','motivo', 'estatus', 'acciones'];
  dataSource = new MatTableDataSource<any>(); 
  constructor(private api: ApiService, private route: ActivatedRoute) { }
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
CancelarCita(id: number) {
}

openDialog(id: number) {
}
detallesCita(id: number) {}
motovoCancelacion(id: number) {}
}
