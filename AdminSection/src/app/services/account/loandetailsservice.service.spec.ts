import { TestBed } from '@angular/core/testing';

import { LoandetailsserviceService } from './loandetailsservice.service';

describe('LoandetailsserviceService', () => {
  let service: LoandetailsserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoandetailsserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
