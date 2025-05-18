import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VistaGeneralMedicosComponent } from './vista-general-medicos/vista-general-medicos.component';
import { FormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';

const routes: Routes = [
 { path: 'VistaGeneralMedicosComponent', component: VistaGeneralMedicosComponent },
]

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatIcon,
    MatIconModule
  ],
  exports: [RouterModule]
})
export class MedicoModule { }