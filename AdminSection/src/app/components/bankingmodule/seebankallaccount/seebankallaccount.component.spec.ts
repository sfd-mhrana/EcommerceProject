import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeebankallaccountComponent } from './seebankallaccount.component';

describe('SeebankallaccountComponent', () => {
  let component: SeebankallaccountComponent;
  let fixture: ComponentFixture<SeebankallaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeebankallaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeebankallaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
