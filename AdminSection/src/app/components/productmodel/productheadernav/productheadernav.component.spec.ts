import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductheadernavComponent } from './productheadernav.component';

describe('ProductheadernavComponent', () => {
  let component: ProductheadernavComponent;
  let fixture: ComponentFixture<ProductheadernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductheadernavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductheadernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
