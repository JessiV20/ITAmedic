import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CitasProgramadasComponent } from './citas-programadas/citas-programadas.component';
import { VistaGeneralAdministrativoComponent } from './vista-general-administrativo/vista-general-administrativo.component';
import { GestionInventarioComponent } from './gestion-inventario/gestion-inventario.component';

const routes: Routes = [
    { path: 'citasProgramadas', component: CitasProgramadasComponent },
    { path: 'VistaGeneralAdministrativo', component: VistaGeneralAdministrativoComponent },
    { path: 'GestionInventario', component: GestionInventarioComponent },

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
export class AdministrativoModule { }
