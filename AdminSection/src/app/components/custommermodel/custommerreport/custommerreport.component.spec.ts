import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustommerreportComponent } from './custommerreport.component';

describe('CustommerreportComponent', () => {
  let component: CustommerreportComponent;
  let fixture: ComponentFixture<CustommerreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustommerreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustommerreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
