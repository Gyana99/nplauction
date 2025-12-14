import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acceptedplayer',
  templateUrl: './acceptedplayer.component.html',
  styleUrls: ['./acceptedplayer.component.scss']
})
export class AcceptedplayerComponent {
 constructor(private cm: CommonService,private en:EncryptionService) { }
  players: any;
  searchText: string = "";
  url = environment.apiUrl + 'storage/uploads/playerimage/';
  roll:any = this.en.decrypt(localStorage.getItem('roll'));
  adminid:any = this.en.decrypt(localStorage.getItem('id'));
  ngOnInit(): void {
    this.allPlyer();
  }
  allPlyer() {
    this.cm.allplyer().subscribe((res: any) => {
      if (res.status) {
        console.log(res.data);
        this.players = res.data.filter((ele:any)=>ele.status == 1);
      }
    })
  }
  acceptPlayer(data: any) {
    console.log(data);

    let param = {
      id: data.id,
      admin : this.adminid
    }
    this.cm.accept(param).subscribe((res: any) => {
      if (res.status) {
        Swal.fire({
          title: 'Success!',
          text: 'Player Accepted Successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.allPlyer();
      }
    })
  }
}
