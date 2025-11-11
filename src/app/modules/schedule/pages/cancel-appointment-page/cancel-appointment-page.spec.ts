import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelAppointmentPageComponent } from './cancel-appointment-page';

describe('CancelAppointmentPage', () => {
  let component: CancelAppointmentPageComponent;
  let fixture: ComponentFixture<CancelAppointmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelAppointmentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelAppointmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
