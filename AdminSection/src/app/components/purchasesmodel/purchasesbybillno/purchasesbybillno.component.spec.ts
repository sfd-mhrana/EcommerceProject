import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesbybillnoComponent } from './purchasesbybillno.component';

describe('PurchasesbybillnoComponent', () => {
  let component: PurchasesbybillnoComponent;
  let fixture: ComponentFixture<PurchasesbybillnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesbybillnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesbybillnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
