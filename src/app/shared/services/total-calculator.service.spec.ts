import { TestBed } from '@angular/core/testing';

import { TotalCalculatorService } from './total-calculator.service';

describe('TotalCalculatorService', () => {
  let service: TotalCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
