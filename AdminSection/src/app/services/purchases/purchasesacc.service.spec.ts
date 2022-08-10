import { TestBed } from '@angular/core/testing';

import { PurchasesaccService } from './purchasesacc.service';

describe('PurchasesaccService', () => {
  let service: PurchasesaccService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchasesaccService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
