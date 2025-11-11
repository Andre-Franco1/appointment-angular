import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaPageComponent } from './area-page';

describe('AreaPage', () => {
  let component: AreaPageComponent;
  let fixture: ComponentFixture<AreaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
