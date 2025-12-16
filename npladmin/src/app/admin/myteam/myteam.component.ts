import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myteam',
  templateUrl: './myteam.component.html',
  styleUrls: ['./myteam.component.scss'],
})
export class MyteamComponent {
  players: any = [];
  url = environment.apiUrl + 'storage/uploads/playerimage/';
  searchText: string = '';
  constructor(
    private cm: CommonService,
    private en: EncryptionService,
    private Router: Router
  ) {}
  id = this.en.decrypt(localStorage.getItem('id'));
  roll = this.en.decrypt(localStorage.getItem('roll'));
  ngOnInit(): void {
    if (this.roll == '1' || this.roll == '0') {
      this.Router.navigate(['dashboard']);
    }
    this.getPoint();
  }
  getPoint() {
    let param = {
      adminid: this.id,
    };
    this.cm.mypointandhistry(param).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.players = res.total_players;
      }
    });
  }
  selectedPlayerId: any = '';
  selectedRole: string = '';

  assignRole() {

    if (!this.selectedPlayerId || !this.selectedRole) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Selection',
        text: 'Please select both Player and Role',
        confirmButtonColor: '#2563eb',
      });
      return;
    }

    let param = {
      id: this.selectedPlayerId,
      roll: this.selectedRole,
      teamid: this.id,
    };

    this.cm.assignRole(param).subscribe({
      next: (res: any) => {
        if (res.status) {
          Swal.fire({
            icon: 'success',
            title: 'Role Assigned',
            text: res.message || 'Role updated successfully',
            timer: 1500,
            showConfirmButton: false,
          });

          // OPTIONAL: refresh players list
          this.getPoint();

          // reset dropdowns
          this.selectedPlayerId = '';
          this.selectedRole = '';
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: res.message || 'Unable to assign role',
            confirmButtonColor: '#dc2626',
          });
        }
      },

      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'Something went wrong. Please try again.',
          confirmButtonColor: '#dc2626',
        });
        console.error(err);
      },
    });
  }
}
