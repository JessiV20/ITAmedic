import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';


export interface Cita {
  idcitas: number;
  idcita?: number;  // Alias opcional
  paciente_nombre: string;
  fecha: string;
  hora: string;
  estatus: 'espera' | 'atendida' | 'cancelada';
  motivo: string;
  paciente_edad: number;
  paciente_sexo: string;
  paciente_peso: number;
  paciente_altura: number;
  medico_nombre: string;
  medico_telefono: string;
  medico_sexo: string;
  medico_edad: number;
  medico_disponibilidad: string;
}


@Component({
  selector: 'app-vista-general-medicos',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule
  ],
  templateUrl: './vista-general-medicos.component.html',
  styleUrls: ['./vista-general-medicos.component.css'],
})
export class VistaGeneralMedicosComponent implements OnInit {
  citas: Cita[] = [];
  filteredCitas: Cita[] = [];
  estados = ['todas', 'espera', 'atendida', 'cancelada'];
  selectedEstado = 'todas';
  medicoId: string | null = null;
  loading = true;
  modoEdicion = false;
  citaEditando: Cita = this.createEmptyCita();
private createEmptyCita(): Cita {
    return {
      idcitas: 0,
      paciente_nombre: '',
      fecha: '',
      hora: '',
      estatus: 'espera',
      motivo: '',
      paciente_edad: 0,
      paciente_sexo: 'Masculino',
      paciente_peso: 0,
      paciente_altura: 0,
      medico_nombre: '',
      medico_telefono: '',
      medico_sexo: '',
      medico_edad: 0,
      medico_disponibilidad: ''
    };
  }

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.medicoId = sessionStorage.getItem('usuarioid');
    if (!this.medicoId) {
      this.router.navigate(['/login/iniciosesion/medico']);
      return;
    }
    this.loadCitas();
  }

  editarCita(cita: Cita): void {
    this.citaEditando = {...cita};
    this.modoEdicion = true;
  }

guardarCambios(): void {
  if (!this.citaEditando?.idcitas) {
    Swal.fire('Error', 'No se ha seleccionado una cita válida para editar', 'error');
    return;
  }

  // Validaciones previas...
  if (!this.citaEditando.paciente_nombre || !this.citaEditando.motivo) {
    Swal.fire('Campos requeridos', 'Nombre del paciente y motivo son campos obligatorios', 'warning');
    return;
  }

  Swal.fire({
    title: 'Confirmar cambios',
    text: '¿Estás seguro de guardar los cambios en los datos del paciente?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, guardar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.loading = true;
      
      this.api.actualizarDatosPacienteCita(this.citaEditando).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Éxito',
            text: 'Datos actualizados correctamente',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            // Recargar los datos completos
            this.loadCitas();
            
            // Cerrar el formulario de edición
            this.cancelarEdicion();
          });
        },
        error: (err) => {
          this.loading = false;
          console.error('Error al actualizar:', err);
          let errorMessage = 'No se pudieron actualizar los datos';
          
          if (err.error?.message) {
            errorMessage += `: ${err.error.message}`;
          }
          
          Swal.fire('Error', errorMessage, 'error');
        }
      });
    }
  });
}

  cancelarEdicion(): void {
    this.modoEdicion = false;

  }

  private formatFecha(fechaString: string): string {
    return fechaString.split('T')[0];
  }
cambiarEstadoCita(idcita: number, nuevoEstado: 'atendida' | 'cancelada'): void {
  console.log('ID Cita recibido:', idcita);
  
  if (!idcita || isNaN(idcita)) {
    console.error('ID de cita inválido:', idcita);
    Swal.fire('Error', 'ID de cita no válido: ' + idcita, 'error');
    return;
  }

  Swal.fire({
    title: 'Confirmar cambio',
    text: `¿Estás seguro de cambiar el estado a ${nuevoEstado}?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, cambiar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.loading = true;
      this.api.actualizarEstadoCita(idcita, nuevoEstado).subscribe({
        next: (response) => {
          // Actualiza el estado localmente sin recargar toda la lista
          const citaIndex = this.citas.findIndex(c => c.idcitas === idcita);
          if (citaIndex !== -1) {
            this.citas[citaIndex].estatus = nuevoEstado;
            this.filterCitas(); // Re-filtrar para actualizar la vista
          }
          Swal.fire('Éxito', 'Estado actualizado correctamente', 'success');
          this.loading = false;
        },
        error: (err) => {
          Swal.fire('Error', 'No se pudo actualizar el estado', 'error');
          console.error('Error:', err);
          this.loading = false;
        }
      });
    }
  });
}

  get totalCitas(): number {
    return this.citas.length;
  }

  get citasEspera(): number {
    return this.citas.filter(c => c.estatus === 'espera').length;
  }

  get citasAtendidas(): number {
    return this.citas.filter(c => c.estatus === 'atendida').length;
  }

  get citasCanceladas(): number {
    return this.citas.filter(c => c.estatus === 'cancelada').length;
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login/iniciosesion/medico']);
  }

 loadCitas(): void {
  this.loading = true;
  this.api.obtenerCitasMedico(this.medicoId!).subscribe({
    next: (data: any) => {
      this.citas = data.map((cita: any) => ({
        ...cita,
        idcita: cita.idcitas, // Mapea idcitas a idcita
        fecha: this.formatFecha(cita.fecha),
        estatus: this.normalizarEstatus(cita.estatus)
      }));
      console.log('Citas cargadas:', this.citas); // Verifica el mapeo
      this.filterCitas();
      this.loading = false;
    },
    error: (err) => {
      this.loading = false;
      Swal.fire('Error', 'No se pudieron cargar las citas', 'error');
      console.error('Error:', err);
    }
  });
}

  private normalizarEstatus(estatus: string): 'espera' | 'atendida' | 'cancelada' {
    const estatusLower = estatus.toLowerCase();
    if (estatusLower === 'atendida') return 'atendida';
    if (estatusLower === 'cancelada') return 'cancelada';
    return 'espera';
  }

  filterCitas(): void {
    if (this.selectedEstado === 'todas') {
      this.filteredCitas = [...this.citas];
    } else {
      this.filteredCitas = this.citas.filter(cita => 
        cita.estatus === this.selectedEstado
      );
    }
  }
}