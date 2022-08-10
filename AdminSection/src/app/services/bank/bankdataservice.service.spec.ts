import { TestBed } from '@angular/core/testing';

import { BankdataserviceService } from './bankdataservice.service';

describe('BankdataserviceService', () => {
  let service: BankdataserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankdataserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
