import { TestBed } from '@angular/core/testing';

import { EmployeeserService } from './employeeser.service';

describe('EmployeeserService', () => {
  let service: EmployeeserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
