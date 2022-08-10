import { TestBed } from '@angular/core/testing';

import { SalesserService } from './salesser.service';

describe('SalesserService', () => {
  let service: SalesserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
