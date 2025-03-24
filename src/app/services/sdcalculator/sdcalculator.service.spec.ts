import { TestBed } from '@angular/core/testing';

import { SdcalculatorService } from './sdcalculator.service';

describe('SdcalculatorService', () => {
  let service: SdcalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SdcalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
