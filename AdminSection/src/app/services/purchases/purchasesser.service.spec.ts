import { TestBed } from '@angular/core/testing';

import { PurchasesserService } from './purchasesser.service';

describe('PurchasesserService', () => {
  let service: PurchasesserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchasesserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
