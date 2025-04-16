import { Component,OnInit } from '@angular/core';
import { Admin, Role } from '../../../models/admin.model';
import { AdminService } from './admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-vista-general-administrativo',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './vista-general-administrativo.component.html',
  styleUrl: './vista-general-administrativo.component.css'
})
export class VistaGeneralAdministrativoComponent implements OnInit  {
  admins: Admin[] = [];
  roles: Role[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getAdmins().subscribe((data) =>{this.admins = data; console.log(data[0]);});
    this.api.getRoles().subscribe(data => this.roles = data);
  }

  onUpdateRole(admin: Admin) {
    const selectedRole = this.roles.find(r => r.rol === admin.role);
    if (selectedRole) {
      this.api.updateRole(admin.id_administrativo, selectedRole.idrol).subscribe(() => {
        alert('Role updated!');
      });
    }
  }
}
