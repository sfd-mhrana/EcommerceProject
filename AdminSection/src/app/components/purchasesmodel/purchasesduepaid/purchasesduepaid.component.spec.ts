import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesduepaidComponent } from './purchasesduepaid.component';

describe('PurchasesduepaidComponent', () => {
  let component: PurchasesduepaidComponent;
  let fixture: ComponentFixture<PurchasesduepaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesduepaidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesduepaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
