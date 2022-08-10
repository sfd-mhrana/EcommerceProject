import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitsalesinvoiceComponent } from './submitsalesinvoice.component';

describe('SubmitsalesinvoiceComponent', () => {
  let component: SubmitsalesinvoiceComponent;
  let fixture: ComponentFixture<SubmitsalesinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitsalesinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitsalesinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
