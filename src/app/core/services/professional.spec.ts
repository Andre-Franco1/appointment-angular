import { TestBed } from '@angular/core/testing';

import { ProfessionalService } from './professional';

describe('Professional', () => {
  let service: ProfessionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
