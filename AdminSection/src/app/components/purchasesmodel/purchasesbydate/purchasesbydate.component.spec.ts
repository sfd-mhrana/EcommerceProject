import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesbydateComponent } from './purchasesbydate.component';

describe('PurchasesbydateComponent', () => {
  let component: PurchasesbydateComponent;
  let fixture: ComponentFixture<PurchasesbydateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesbydateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesbydateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
