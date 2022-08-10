import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcustommerComponent } from './newcustommer.component';

describe('NewcustommerComponent', () => {
  let component: NewcustommerComponent;
  let fixture: ComponentFixture<NewcustommerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcustommerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcustommerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
