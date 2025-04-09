import { Routes } from '@angular/router';
import { InicioBotonesComponent } from '../components/views/inicio/inicio-botones/inicio-botones.component';
import { AdministrativoModule } from '../components/views/administrativo/administrativo.module';
import { PacienteModule } from '../components/views/paciente/paciente.module';
import { MedicoModule } from '../components/views/medico/medico.module';
import { LoginComponent } from '../components/views/inicio/login/login.component';
import { Component } from '@angular/core';
import { RegistroPacienteComponent } from '../components/views/inicio/registro-paciente/registro-paciente.component';

export const routes: Routes = [
    {path: '', redirectTo: 'botones/iniciosesion', pathMatch: 'full'},
    {  
        path: '',

        children: [
            {
                path: 'administrativo', loadChildren: () => import('../components/views/administrativo/administrativo.module').then(ele => ele.AdministrativoModule)
            },
            {
                path : 'paciente', loadChildren: () => import('../components/views/paciente/paciente.module').then(ele => ele.PacienteModule)
            },
            {
                path : 'medico', loadChildren: () => import('../components/views/medico/medico.module').then(ele => ele.MedicoModule)
            },
        ]
    },
    { path: 'login/iniciosesion/:tipo', component: LoginComponent },
    
    { path: 'registro/paciente', component: RegistroPacienteComponent },
    {
        path: 'botones/iniciosesion',  component: InicioBotonesComponent, data: { title: "hola" }
    },
    {path: '**', component: InicioBotonesComponent}
];
