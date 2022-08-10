import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendtobankComponent } from './sendtobank.component';

describe('SendtobankComponent', () => {
  let component: SendtobankComponent;
  let fixture: ComponentFixture<SendtobankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendtobankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendtobankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
