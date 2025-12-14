import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './include/header/header.component';
import { FooterComponent } from './include/footer/footer.component';
import { SidePanelComponent } from './include/side-panel/side-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdmindasbordComponent } from './admindasbord/admindasbord.component';
import { AllPlayerComponent } from './all-player/all-player.component';
import { FilterPlayersPipe } from '../filter-players.pipe';
import { AcceptedplayerComponent } from './acceptedplayer/acceptedplayer.component';
import { TeamComponent } from './team/team.component';
import { PointComponent } from './point/point.component';
import { CurentauctionComponent } from './curentauction/curentauction.component';


@NgModule({
  declarations: [
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SidePanelComponent,
    DashboardComponent,
    AdmindasbordComponent,
    AllPlayerComponent,
    FilterPlayersPipe,
    AcceptedplayerComponent,
    TeamComponent,
    PointComponent,
    CurentauctionComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
