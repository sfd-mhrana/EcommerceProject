import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesheadernavComponent } from './purchasesheadernav.component';

describe('PurchasesheadernavComponent', () => {
  let component: PurchasesheadernavComponent;
  let fixture: ComponentFixture<PurchasesheadernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesheadernavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesheadernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
