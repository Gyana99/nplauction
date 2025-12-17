import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsoldplayerComponent } from './unsoldplayer.component';

describe('UnsoldplayerComponent', () => {
  let component: UnsoldplayerComponent;
  let fixture: ComponentFixture<UnsoldplayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnsoldplayerComponent]
    });
    fixture = TestBed.createComponent(UnsoldplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
