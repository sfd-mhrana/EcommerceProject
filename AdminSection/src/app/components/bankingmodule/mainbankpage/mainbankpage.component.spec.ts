import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainbankpageComponent } from './mainbankpage.component';

describe('MainbankpageComponent', () => {
  let component: MainbankpageComponent;
  let fixture: ComponentFixture<MainbankpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainbankpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainbankpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
