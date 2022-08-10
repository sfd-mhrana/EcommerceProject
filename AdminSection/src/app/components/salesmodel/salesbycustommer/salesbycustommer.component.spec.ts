import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesbycustommerComponent } from './salesbycustommer.component';

describe('SalesbycustommerComponent', () => {
  let component: SalesbycustommerComponent;
  let fixture: ComponentFixture<SalesbycustommerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesbycustommerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesbycustommerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
