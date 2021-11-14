import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaitapdanopComponent } from './baitapdanop.component';

describe('BaitapdanopComponent', () => {
  let component: BaitapdanopComponent;
  let fixture: ComponentFixture<BaitapdanopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaitapdanopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaitapdanopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
