import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedplayerComponent } from './acceptedplayer.component';

describe('AcceptedplayerComponent', () => {
  let component: AcceptedplayerComponent;
  let fixture: ComponentFixture<AcceptedplayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptedplayerComponent]
    });
    fixture = TestBed.createComponent(AcceptedplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
