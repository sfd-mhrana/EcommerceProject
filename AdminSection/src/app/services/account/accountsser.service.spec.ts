import { TestBed } from '@angular/core/testing';

import { AccountsserService } from './accountsser.service';

describe('AccountsserService', () => {
  let service: AccountsserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountsserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
