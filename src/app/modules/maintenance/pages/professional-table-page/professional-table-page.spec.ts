import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalTablePageComponent } from './professional-table-page';

describe('ProfessionalTablePage', () => {
  let component: ProfessionalTablePageComponent;
  let fixture: ComponentFixture<ProfessionalTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalTablePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
