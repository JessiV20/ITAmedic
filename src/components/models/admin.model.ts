export interface Admin {
    id_administrativo: number;
    username: string;
    role: string; // This is the name of the role (e.g., 'General', 'Stock', 'Appointments')
  }
  
  export interface Role {
    idrol: number;
    rol: string; // e.g., 'General', 'Stock', 'Appointments'
  }
  