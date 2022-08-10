import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustommerheadernavComponent } from './custommerheadernav.component';

describe('CustommerheadernavComponent', () => {
  let component: CustommerheadernavComponent;
  let fixture: ComponentFixture<CustommerheadernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustommerheadernavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustommerheadernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
