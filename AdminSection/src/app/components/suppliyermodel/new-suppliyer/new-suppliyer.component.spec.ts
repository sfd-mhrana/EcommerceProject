import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSuppliyerComponent } from './new-suppliyer.component';

describe('NewSuppliyerComponent', () => {
  let component: NewSuppliyerComponent;
  let fixture: ComponentFixture<NewSuppliyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSuppliyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSuppliyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
