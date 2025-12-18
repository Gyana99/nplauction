import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-player-bid-card',
  templateUrl: './player-bid-card.component.html',
  styleUrls: ['./player-bid-card.component.scss'],
})
export class PlayerBidCardComponent implements OnInit {
  @Input() player: any;
  @Input() imageUrl!: string;

  @Output() closed = new EventEmitter<void>();
  @Output() sold = new EventEmitter<any>();

  bidAmount = 0;
  selectedTeam: number = 0;
  amount: any=0;

  constructor(private CS: CommonService) {}

  teams: any = [];

  ngOnInit() {
    this.bidAmount = Number(this.player.base_price) || 0;
    this.getTeam();
  }

  increase() {
    this.bidAmount += 100;
  }

  confirmSold() {
    this.sold.emit({
      player_id: this.player.id,
      team_id: this.selectedTeam,
      bid_amount: Number(this.bidAmount),
    });

    this.closed.emit(); // close popup ONLY here
  }

  getTeam() {
    this.CS.viewTeam().subscribe((res: any) => {
      //console.log(res);
      if (res.status) {
        this.teams = res.data;
      }
    });
  }

  close() {
    this.closed.emit(); // close via ✖ button
  }

  amountAdmin(event: any) {
  this.amount =
      event.target.options[event.target.selectedIndex].getAttribute(
        'data-amount'
      );


    console.log('Amount:', this.amount);
  }
}
