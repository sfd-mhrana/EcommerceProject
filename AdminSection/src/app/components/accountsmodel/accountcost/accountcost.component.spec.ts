import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountcostComponent } from './accountcost.component';

describe('AccountcostComponent', () => {
  let component: AccountcostComponent;
  let fixture: ComponentFixture<AccountcostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountcostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountcostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
