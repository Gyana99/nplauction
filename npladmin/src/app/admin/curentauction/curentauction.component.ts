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
  constructor(
    private cm: CommonService,
    private en: EncryptionService,
    private Router: Router
  ) {}
  players: any;
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
  auction(data: any) {
    console.log(data);
  }
   /* 🔹 OPEN POPUP */
  openBidPopup(player: any) {
    this.selectedPlayer = { ...player }; // clone to avoid direct mutation
  }

  /* 🔹 CLOSE POPUP */
  closeBidPopup() {
    this.selectedPlayer = null;
  }

  /* 🔹 BID CHANGE FROM CHILD */
  onBidChange(data: any) {
    console.log('Bid updated:', data);

    // Example: update UI or call API
    this.selectedPlayer.base_price = data.amount;

    // optional: close popup after bid
    // this.closeBidPopup();
  }
}
