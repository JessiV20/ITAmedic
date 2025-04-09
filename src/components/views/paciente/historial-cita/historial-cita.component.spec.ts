import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialCitaComponent } from './historial-cita.component';

describe('HistorialCitaComponent', () => {
  let component: HistorialCitaComponent;
  let fixture: ComponentFixture<HistorialCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialCitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
