import { TestBed } from '@angular/core/testing';

import { CostingserService } from './costingser.service';

describe('CostingserService', () => {
  let service: CostingserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostingserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
