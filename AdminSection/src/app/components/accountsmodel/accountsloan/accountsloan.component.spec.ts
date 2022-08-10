import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsloanComponent } from './accountsloan.component';

describe('AccountsloanComponent', () => {
  let component: AccountsloanComponent;
  let fixture: ComponentFixture<AccountsloanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsloanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
