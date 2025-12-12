import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './include/header/header.component';
import { FooterComponent } from './include/footer/footer.component';
import { SidePanelComponent } from './include/side-panel/side-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdmindasbordComponent } from './admindasbord/admindasbord.component';


@NgModule({
  declarations: [
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SidePanelComponent,
    DashboardComponent,
    AdmindasbordComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
