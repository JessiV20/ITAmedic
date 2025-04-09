import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompartidosModule } from '../../../modules/compartidos.module';

@Component({
  selector: 'app-inicio-botones',
  imports: [CompartidosModule, RouterLink],
  templateUrl: './inicio-botones.component.html',
  styleUrl: './inicio-botones.component.css'
})
export class InicioBotonesComponent {

}
