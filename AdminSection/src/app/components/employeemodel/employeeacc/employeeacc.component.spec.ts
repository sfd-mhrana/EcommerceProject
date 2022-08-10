import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeaccComponent } from './employeeacc.component';

describe('EmployeeaccComponent', () => {
  let component: EmployeeaccComponent;
  let fixture: ComponentFixture<EmployeeaccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeaccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeaccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
