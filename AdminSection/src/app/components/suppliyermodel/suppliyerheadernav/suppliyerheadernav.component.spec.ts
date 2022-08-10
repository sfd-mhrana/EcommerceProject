import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliyerheadernavComponent } from './suppliyerheadernav.component';

describe('SuppliyerheadernavComponent', () => {
  let component: SuppliyerheadernavComponent;
  let fixture: ComponentFixture<SuppliyerheadernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliyerheadernavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliyerheadernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
