import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogincomponentsComponent } from './logincomponents.component';

describe('LogincomponentsComponent', () => {
  let component: LogincomponentsComponent;
  let fixture: ComponentFixture<LogincomponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogincomponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogincomponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
