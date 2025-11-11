import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalPageComponent } from './professional-page';

describe('ProfessionalPage', () => {
  let component: ProfessionalPageComponent;
  let fixture: ComponentFixture<ProfessionalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
