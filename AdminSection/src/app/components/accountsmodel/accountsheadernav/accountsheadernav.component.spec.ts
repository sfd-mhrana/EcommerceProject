import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsheadernavComponent } from './accountsheadernav.component';

describe('AccountsheadernavComponent', () => {
  let component: AccountsheadernavComponent;
  let fixture: ComponentFixture<AccountsheadernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsheadernavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsheadernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
