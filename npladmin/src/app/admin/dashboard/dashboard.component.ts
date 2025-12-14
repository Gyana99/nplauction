import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isMobileMenuOpen: boolean = false; // changed Boolean to boolean

  toggleMenu() {
    //alert(this.isMobileMenuOpen);
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    console.log("Sidebar status:", this.isMobileMenuOpen);
  }
}
