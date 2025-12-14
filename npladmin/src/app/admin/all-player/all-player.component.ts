import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-all-player',
  templateUrl: './all-player.component.html',
  styleUrls: ['./all-player.component.scss']
})
export class AllPlayerComponent {
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
        this.players = res.data.filter((ele:any)=>ele.status == 0);
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
