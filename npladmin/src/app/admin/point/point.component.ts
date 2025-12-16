import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent {
  teams: any[] = [];
  imageBaseUrl = environment.apiUrl + 'storage/uploads/logo/'; // change URL
  loadingId: number | null = null;

  constructor(private teamService: CommonService,private en:EncryptionService,private Router:Router) { }
  roll = this.en.decrypt(localStorage.getItem('roll'));
  
  ngOnInit(): void {
    console.log(this.roll);
    
    if(this.roll == '2' || this.roll == '0'){
      this.Router.navigate(['dashboard'])
    }
    this.loadTeams();
    
  }

  /* ==========================
     LOAD TEAM LIST
  ========================== */
  loadTeams() {
    this.teamService.viewTeam().subscribe({
      next: (res) => {
        if (res.status) {
          this.teams = res.data;
        }
      },
      error: () => {
        Swal.fire('Error', 'Failed to load teams', 'error');
      }
    });
  }

  /* ==========================
     GIVE AMOUNT ACTION
  ========================== */
  giveAmount(team: any) {
    Swal.fire({
      title: 'Give Amount?',
      text: `Give amount to ${team.team_name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Give',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#16a34a'
    }).then((result) => {

      if (result.isConfirmed) {
        this.loadingId = team.id;
        let param = {
          id:team.id,
          created_by:this.en.decrypt(localStorage.getItem('id'))
        }

        this.teamService.giveAmount(param).subscribe({
          next: (res) => {
            if (res.status) {
              team.amount_status = 1; // update UI
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.message,
                showConfirmButton: true
              });
              this.ngOnInit();
            }
            this.loadingId = null;
          },
          error: () => {
            this.loadingId = null;
            Swal.fire('Error', 'Failed to give amount', 'error');
          }
        });

      }

    });
  }
}
