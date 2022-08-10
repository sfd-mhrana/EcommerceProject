import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddaccountsamountComponent } from './addaccountsamount.component';

describe('AddaccountsamountComponent', () => {
  let component: AddaccountsamountComponent;
  let fixture: ComponentFixture<AddaccountsamountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddaccountsamountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddaccountsamountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
