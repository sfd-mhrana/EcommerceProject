import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliyerreportComponent } from './suppliyerreport.component';

describe('SuppliyerreportComponent', () => {
  let component: SuppliyerreportComponent;
  let fixture: ComponentFixture<SuppliyerreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliyerreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliyerreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
