import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayAppointmentsPageComponent } from './today-appointments-page';

describe('TodayAppointmentsPage', () => {
  let component: TodayAppointmentsPageComponent;
  let fixture: ComponentFixture<TodayAppointmentsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayAppointmentsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayAppointmentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
