import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesduepaidComponent } from './salesduepaid.component';

describe('SalesduepaidComponent', () => {
  let component: SalesduepaidComponent;
  let fixture: ComponentFixture<SalesduepaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesduepaidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesduepaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
