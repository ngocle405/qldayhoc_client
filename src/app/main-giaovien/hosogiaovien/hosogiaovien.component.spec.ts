import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HosogiaovienComponent } from './hosogiaovien.component';

describe('HosogiaovienComponent', () => {
  let component: HosogiaovienComponent;
  let fixture: ComponentFixture<HosogiaovienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HosogiaovienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HosogiaovienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
