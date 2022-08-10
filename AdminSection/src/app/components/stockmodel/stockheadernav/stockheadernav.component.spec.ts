import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockheadernavComponent } from './stockheadernav.component';

describe('StockheadernavComponent', () => {
  let component: StockheadernavComponent;
  let fixture: ComponentFixture<StockheadernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockheadernavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockheadernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
