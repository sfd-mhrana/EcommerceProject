import { TestBed } from '@angular/core/testing';

import { EmployeeaccService } from './employeeacc.service';

describe('EmployeeaccService', () => {
  let service: EmployeeaccService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeaccService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
