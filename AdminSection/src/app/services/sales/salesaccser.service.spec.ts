import { TestBed } from '@angular/core/testing';

import { SalesaccserService } from './salesaccser.service';

describe('SalesaccserService', () => {
  let service: SalesaccserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesaccserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
