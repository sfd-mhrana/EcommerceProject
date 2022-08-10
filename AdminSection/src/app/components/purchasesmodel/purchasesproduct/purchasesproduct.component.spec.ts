import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesproductComponent } from './purchasesproduct.component';

describe('PurchasesproductComponent', () => {
  let component: PurchasesproductComponent;
  let fixture: ComponentFixture<PurchasesproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
