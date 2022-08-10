import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesaccountComponent } from './salesaccount.component';

describe('SalesaccountComponent', () => {
  let component: SalesaccountComponent;
  let fixture: ComponentFixture<SalesaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
