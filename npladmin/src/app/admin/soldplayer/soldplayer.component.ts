import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-soldplayer',
  templateUrl: './soldplayer.component.html',
  styleUrls: ['./soldplayer.component.scss']
})
export class SoldplayerComponent {
constructor(private cm: CommonService, private en: EncryptionService,private Router:Router) {}
   players: any;
  searchText: string = '';
  url = environment.apiUrl + 'storage/uploads/playerimage/';
  roll: any = this.en.decrypt(localStorage.getItem('roll'));
  adminid: any = this.en.decrypt(localStorage.getItem('id'));
 ngOnInit(): void {

    this.allPlyer();
  }
   allPlyer() {
    this.cm.allplyer().subscribe((res: any) => {
      if (res.status) {
        console.log(res.data);
        this.players = res.data.filter((ele: any) => ele.status == 1 && Number(ele.occupied_price) > 0);
      }
    });
  }
}
