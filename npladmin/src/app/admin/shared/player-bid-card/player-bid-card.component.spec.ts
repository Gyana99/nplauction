import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBidCardComponent } from './player-bid-card.component';

describe('PlayerBidCardComponent', () => {
  let component: PlayerBidCardComponent;
  let fixture: ComponentFixture<PlayerBidCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerBidCardComponent]
    });
    fixture = TestBed.createComponent(PlayerBidCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
