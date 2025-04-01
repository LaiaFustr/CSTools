import { TestBed } from '@angular/core/testing';

import { KmdistancesService } from './kmdistances.service';

describe('KmdistancesService', () => {
  let service: KmdistancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KmdistancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
