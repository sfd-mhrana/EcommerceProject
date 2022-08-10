import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbankComponent } from './newbank.component';

describe('NewbankComponent', () => {
  let component: NewbankComponent;
  let fixture: ComponentFixture<NewbankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewbankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
