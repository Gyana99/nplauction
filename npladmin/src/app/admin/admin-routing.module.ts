import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdmindasbordComponent } from './admindasbord/admindasbord.component';
import { AuthGuard } from '../guards/auth.guard';
import { AllPlayerComponent } from './all-player/all-player.component';
import { AcceptedplayerComponent } from './acceptedplayer/acceptedplayer.component';
import { TeamComponent } from './team/team.component';
import { PointComponent } from './point/point.component';
import { CurentauctionComponent } from './curentauction/curentauction.component';
import { MypointComponent } from './mypoint/mypoint.component';
import { MyteamComponent } from './myteam/myteam.component';
import { MakeplayingelevenComponent } from './makeplayingeleven/makeplayingeleven.component';


const routes: Routes = [
  // This matches /admin/login
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },

  // Optional: Redirect /admin directly to /admin/login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: DashboardComponent, canActivate:[AuthGuard],
    children: [
      { path: 'dashboard', component: AdmindasbordComponent },
      { path: 'players', component: AllPlayerComponent },
      { path: 'acce-players', component: AcceptedplayerComponent },
      { path: 'teams', component: TeamComponent },
      { path: 'give-points', component: PointComponent },
      { path: 'select-player', component: CurentauctionComponent },

      { path: 'mypoint', component: MypointComponent },
      { path: 'myteam', component: MyteamComponent },
      { path: 'make11', component: MakeplayingelevenComponent },



      

      
      
      
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
