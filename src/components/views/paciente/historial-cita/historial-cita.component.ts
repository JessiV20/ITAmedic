import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router'; 
import { MatTableDataSource } from '@angular/material/table';
import { CompartidosModule } from '../../../modules/compartidos.module';

@Component({
  selector: 'app-historial-cita',
  imports: [CompartidosModule],
  templateUrl: './historial-cita.component.html',
  styleUrl: './historial-cita.component.css'
})
export class HistorialCitaComponent {
  idPaciente: string | null = null;
  displayedColumns: string[] = ['idcitas', 'nombrePaciente', 'nombreMedico', 'fecha', 'estatus'];
  dataSource = new MatTableDataSource<any>(); 
  constructor(private api: ApiService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.idPaciente = this.route.snapshot.queryParamMap.get('id');
    console.log('ID del paciente:', this.idPaciente);
    this.obtenerHistorialCitas();
  }
  ngafterViewInit() {
    this.obtenerHistorialCitas();
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
}
