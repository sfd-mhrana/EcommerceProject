import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountinvestmentsComponent } from './accountinvestments.component';

describe('AccountinvestmentsComponent', () => {
  let component: AccountinvestmentsComponent;
  let fixture: ComponentFixture<AccountinvestmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountinvestmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountinvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
