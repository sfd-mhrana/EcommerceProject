import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitinvoiceComponent } from './submitinvoice.component';

describe('SubmitinvoiceComponent', () => {
  let component: SubmitinvoiceComponent;
  let fixture: ComponentFixture<SubmitinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
