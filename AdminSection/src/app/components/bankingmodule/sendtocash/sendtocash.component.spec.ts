import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendtocashComponent } from './sendtocash.component';

describe('SendtocashComponent', () => {
  let component: SendtocashComponent;
  let fixture: ComponentFixture<SendtocashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendtocashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendtocashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
