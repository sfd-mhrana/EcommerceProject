import { TestBed } from '@angular/core/testing';

import { InvestingserService } from './investingser.service';

describe('InvestingserService', () => {
  let service: InvestingserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestingserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
