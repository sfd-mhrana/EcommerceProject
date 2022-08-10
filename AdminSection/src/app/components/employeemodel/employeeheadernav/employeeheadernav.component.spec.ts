import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeheadernavComponent } from './employeeheadernav.component';

describe('EmployeeheadernavComponent', () => {
  let component: EmployeeheadernavComponent;
  let fixture: ComponentFixture<EmployeeheadernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeheadernavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeheadernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
