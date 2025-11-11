import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentTypePageComponent } from './appointment-type-page';

describe('AppointmentTypePage', () => {
  let component: AppointmentTypePageComponent;
  let fixture: ComponentFixture<AppointmentTypePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentTypePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentTypePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
