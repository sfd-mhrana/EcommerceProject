import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesbybillComponent } from './salesbybill.component';

describe('SalesbybillComponent', () => {
  let component: SalesbybillComponent;
  let fixture: ComponentFixture<SalesbybillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesbybillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesbybillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
