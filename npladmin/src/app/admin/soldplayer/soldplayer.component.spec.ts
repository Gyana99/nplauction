import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldplayerComponent } from './soldplayer.component';

describe('SoldplayerComponent', () => {
  let component: SoldplayerComponent;
  let fixture: ComponentFixture<SoldplayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoldplayerComponent]
    });
    fixture = TestBed.createComponent(SoldplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
