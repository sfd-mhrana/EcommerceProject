import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesheadernavComponent } from './salesheadernav.component';

describe('SalesheadernavComponent', () => {
  let component: SalesheadernavComponent;
  let fixture: ComponentFixture<SalesheadernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesheadernavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesheadernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
