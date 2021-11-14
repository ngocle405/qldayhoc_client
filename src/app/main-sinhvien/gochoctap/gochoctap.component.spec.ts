import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GochoctapComponent } from './gochoctap.component';

describe('GochoctapComponent', () => {
  let component: GochoctapComponent;
  let fixture: ComponentFixture<GochoctapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GochoctapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GochoctapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
