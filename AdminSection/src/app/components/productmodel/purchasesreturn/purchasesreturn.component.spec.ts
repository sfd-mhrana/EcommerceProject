import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesreturnComponent } from './purchasesreturn.component';

describe('PurchasesreturnComponent', () => {
  let component: PurchasesreturnComponent;
  let fixture: ComponentFixture<PurchasesreturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesreturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesreturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
