import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietlophocComponent } from './chitietlophoc.component';

describe('ChitietlophocComponent', () => {
  let component: ChitietlophocComponent;
  let fixture: ComponentFixture<ChitietlophocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChitietlophocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietlophocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
