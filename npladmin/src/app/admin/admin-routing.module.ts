import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdmindasbordComponent } from './admindasbord/admindasbord.component';
import { AuthGuard } from '../guards/auth.guard';

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
      { path: 'dashboard', component: AdmindasbordComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
