import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admindasbord',
  templateUrl: './admindasbord.component.html',
  styleUrls: ['./admindasbord.component.scss'],
})
export class AdmindasbordComponent {
    teams: any=[];
    path :any = environment.apiUrl+'storage/uploads/'
 ngOnInit(): void {
  this.loadTeams();
 }
constructor(private CS: CommonService) { }

    loadTeams() {
    this.CS.viewTeam().subscribe((res: any) => {
      if (res.status) {
        this.teams = res.data;
      }
    });
    // API CALL HERE
    // this.teams = [
    //   { id: 1, team_name: 'Warriors', short_name: 'WAR', amount: 5000, status: 1 }
    // ];
  }
}
