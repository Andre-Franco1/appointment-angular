import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalWorkdaysPageComponent } from './professional-workdays-page';

describe('ProfessionalWorkdaysPage', () => {
  let component: ProfessionalWorkdaysPageComponent;
  let fixture: ComponentFixture<ProfessionalWorkdaysPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalWorkdaysPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalWorkdaysPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
