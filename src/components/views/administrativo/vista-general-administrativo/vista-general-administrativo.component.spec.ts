import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaGeneralAdministrativoComponent } from './vista-general-administrativo.component';

describe('VistaGeneralAdministrativoComponent', () => {
  let component: VistaGeneralAdministrativoComponent;
  let fixture: ComponentFixture<VistaGeneralAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaGeneralAdministrativoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaGeneralAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
