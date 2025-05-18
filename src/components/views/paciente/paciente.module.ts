import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GenerarCitaComponent } from './generar-cita/generar-cita.component';
import { HistorialCitaComponent } from './historial-cita/historial-cita.component';

const routes: Routes = [
    { path: 'generarCita', component: GenerarCitaComponent },
    { path: 'historialCita', component: HistorialCitaComponent },

]

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PacienteModule { }