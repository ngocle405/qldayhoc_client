import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietbaitapComponent } from './chitietbaitap.component';

describe('ChitietbaitapComponent', () => {
  let component: ChitietbaitapComponent;
  let fixture: ComponentFixture<ChitietbaitapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChitietbaitapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietbaitapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
