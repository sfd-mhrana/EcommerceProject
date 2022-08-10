import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesbydateComponent } from './salesbydate.component';

describe('SalesbydateComponent', () => {
  let component: SalesbydateComponent;
  let fixture: ComponentFixture<SalesbydateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesbydateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesbydateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
