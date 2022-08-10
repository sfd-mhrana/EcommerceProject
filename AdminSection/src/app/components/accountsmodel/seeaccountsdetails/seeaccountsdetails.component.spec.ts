import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeaccountsdetailsComponent } from './seeaccountsdetails.component';

describe('SeeaccountsdetailsComponent', () => {
  let component: SeeaccountsdetailsComponent;
  let fixture: ComponentFixture<SeeaccountsdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeaccountsdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeaccountsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
