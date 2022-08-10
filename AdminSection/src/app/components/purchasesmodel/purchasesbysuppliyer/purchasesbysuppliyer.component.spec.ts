import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesbysuppliyerComponent } from './purchasesbysuppliyer.component';

describe('PurchasesbysuppliyerComponent', () => {
  let component: PurchasesbysuppliyerComponent;
  let fixture: ComponentFixture<PurchasesbysuppliyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesbysuppliyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesbysuppliyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
