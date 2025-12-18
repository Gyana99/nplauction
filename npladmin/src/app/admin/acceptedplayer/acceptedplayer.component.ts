import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceptedplayer',
  templateUrl: './acceptedplayer.component.html',
  styleUrls: ['./acceptedplayer.component.scss'],
})
export class AcceptedplayerComponent {
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
    // if (this.roll == '2' || this.roll == '0') {
    //   this.Router.navigate(['dashboard']);
    // }
    this.allPlyer();
  }
  allPlyer() {
    this.cm.allplyer().subscribe((res: any) => {
      if (res.status) {
        console.log(res.data);
        this.players = res.data.filter((ele: any) => ele.status == 1);
      }
    });
  }
  acceptPlayer(data: any) {
    console.log(data);

    let param = {
      id: data.id,
      admin: this.adminid,
    };
    this.cm.accept(param).subscribe((res: any) => {
      if (res.status) {
        Swal.fire({
          title: 'Success!',
          text: 'Player Accepted Successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        this.allPlyer();
      }
    });
  }
  deletePlayer(data: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this player?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cm.deletePlyer({ id: data }).subscribe({
          next: (res: any) => {
            if (res.status) {
              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: res.message || 'Player deleted successfully',
                timer: 1500,
                showConfirmButton: false,
              });

              // 🔄 Remove from UI list (recommended)
              this.players = this.players.filter((p: any) => p.id !== data);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: res.message || 'Unable to delete player',
              });
            }
          },

          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Server Error',
              text: 'Something went wrong. Try again later.',
            });
          },
        });
      }
    });
  }
  editPlayerData: any = null;
  editPlayer(data: any) {
    this.editPlayerData = { ...data };
  }
  onModalClose(updated: boolean) {
    this.editPlayerData = null;
    if (updated) this.allPlyer();
  }
}
