import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesproductComponent } from './salesproduct.component';

describe('SalesproductComponent', () => {
  let component: SalesproductComponent;
  let fixture: ComponentFixture<SalesproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
