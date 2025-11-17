import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateAppointmentComponent } from './form-create-appointment';

describe('FormCreateAppointment', () => {
  let component: FormCreateAppointmentComponent;
  let fixture: ComponentFixture<FormCreateAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
