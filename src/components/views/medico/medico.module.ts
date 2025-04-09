import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VistaGeneralMedicosComponent } from './vista-general-medicos/vista-general-medicos.component';

const routes: Routes = [
 { path: 'VistaGeneralMedicosComponent', component: VistaGeneralMedicosComponent },
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
export class MedicoModule { }