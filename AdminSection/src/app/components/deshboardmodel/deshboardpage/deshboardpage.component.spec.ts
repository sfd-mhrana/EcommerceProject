import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeshboardpageComponent } from './deshboardpage.component';

describe('DeshboardpageComponent', () => {
  let component: DeshboardpageComponent;
  let fixture: ComponentFixture<DeshboardpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeshboardpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeshboardpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
