import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-curentauction',
  templateUrl: './curentauction.component.html',
  styleUrls: ['./curentauction.component.scss'],
})
export class CurentauctionComponent {
  selectedPlayer: any;
  showBidPopup: boolean = false;
  constructor(
    private cm: CommonService,
    private en: EncryptionService,
    private Router: Router
  ) {}
  players: any = [];
  searchText: string = '';
  url = environment.apiUrl + 'storage/uploads/playerimage/';
  roll: any = this.en.decrypt(localStorage.getItem('roll'));
  adminid: any = this.en.decrypt(localStorage.getItem('id'));

  ngOnInit(): void {
    if (this.roll == '2' || this.roll == '0') {
      this.Router.navigate(['dashboard']);
    }
    this.allPlyer();
  }
  allPlyer() {
    this.cm.allplyer().subscribe((res: any) => {
      if (res.status) {
        console.log(res.data);
        this.players = res.data.filter(
          (ele: any) => ele.status == 1 && ele.occupied_price == 0
        );
      }
    });
  }
  //   showBidPopup = false;
  // selectedPlayer: any = null;

  openBidPopup(player: any) {
    this.selectedPlayer = player;
    this.showBidPopup = true;
  }

  closeBidPopup() {
    this.showBidPopup = false;
    this.selectedPlayer = null;
  }

  onFinalSold(data: any) {
    this.cm.updateBiding(data).subscribe({
      next: (res: any) => {
        if (res.status) {
          const d = res.data;

          Swal.fire({
            title: '🏏 SOLD!',
            html: `
            <div style="font-size:16px; line-height:1.6">
              <strong style="font-size:20px; color:#d32f2f;">
                ${d.player_name}
              </strong><br/>
              joins <strong>${d.team_name}</strong><br/>
              for <span style="color:#2e7d32; font-size:22px;">
                ${this.formatAmount(d.bid_amount)}
              </span>
            </div>
          `,
            background: 'linear-gradient(145deg, #fff, #f9f9f9)',
            icon: 'success',
            showConfirmButton: true,
            //timer: 3000,
            backdrop: `
            rgba(0,0,0,0.85)
            url("https://media.giphy.com/media/l0HU7JI8T7n0pN1UQ/giphy.gif")
            center top
            no-repeat
          `,
            // didOpen: () => {
            //   Swal.showLoading();
            // },
          });

          // refresh data
          this.ngOnInit();
        }
      },
      error: () => {
        Swal.fire('Error', 'Auction update failed', 'error');
      },
    });
  }
  formatAmount(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(Number(amount))) {
    return '₹0';
  }

  return '₹' + Number(amount).toLocaleString('en-IN');
}
}
