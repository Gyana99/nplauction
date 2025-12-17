import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-player-bid-card',
  templateUrl: './player-bid-card.component.html',
  styleUrls: ['./player-bid-card.component.scss']
})
export class PlayerBidCardComponent {

  @Input() player: any;
  @Input() imageUrl!: string;

  @Output() bidChange = new EventEmitter<number>();

  bidAmount = 0;
  step = 1000; // increase step

  ngOnInit() {
    this.bidAmount = this.player.base_price || 0;
  }

  increase() {
    this.bidAmount += this.step;
    this.bidChange.emit(this.bidAmount);
  }
}
