import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpurchasesComponent } from './newpurchases.component';

describe('NewpurchasesComponent', () => {
  let component: NewpurchasesComponent;
  let fixture: ComponentFixture<NewpurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewpurchasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
