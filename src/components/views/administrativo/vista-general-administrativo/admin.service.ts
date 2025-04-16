import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin, Role } from '../../../models/admin.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) {}

  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>('/api/admins');
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>('/api/roles');
  }

  updateRole(adminId: number, roleId: number): Observable<any> {
    return this.http.put(`/api/admins/${adminId}/role`, { role_id: roleId });
  }
}
