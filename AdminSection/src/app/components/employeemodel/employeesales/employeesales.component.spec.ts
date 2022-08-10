import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesalesComponent } from './employeesales.component';

describe('EmployeesalesComponent', () => {
  let component: EmployeesalesComponent;
  let fixture: ComponentFixture<EmployeesalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
