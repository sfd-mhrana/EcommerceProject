import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesaccountComponent } from './purchasesaccount.component';

describe('PurchasesaccountComponent', () => {
  let component: PurchasesaccountComponent;
  let fixture: ComponentFixture<PurchasesaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
