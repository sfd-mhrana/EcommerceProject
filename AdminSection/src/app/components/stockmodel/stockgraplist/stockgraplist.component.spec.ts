import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockgraplistComponent } from './stockgraplist.component';

describe('StockgraplistComponent', () => {
  let component: StockgraplistComponent;
  let fixture: ComponentFixture<StockgraplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockgraplistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockgraplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
