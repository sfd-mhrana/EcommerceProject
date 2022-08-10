import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankheadernavComponent } from './bankheadernav.component';

describe('BankheadernavComponent', () => {
  let component: BankheadernavComponent;
  let fixture: ComponentFixture<BankheadernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankheadernavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankheadernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
