import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaGeneralMedicosComponent } from './vista-general-medicos.component';

describe('VistaGeneralMedicosComponent', () => {
  let component: VistaGeneralMedicosComponent;
  let fixture: ComponentFixture<VistaGeneralMedicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaGeneralMedicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaGeneralMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
