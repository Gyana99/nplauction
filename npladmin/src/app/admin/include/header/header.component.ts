import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
// Create an event sender
  @Output() toggleSidebar = new EventEmitter<void>();
  id:any;
  user:any;
  roll:any;
  constructor(private r:Router) {
    this.id = localStorage.getItem('id');
    this.user = localStorage.getItem('username');
    this.roll = localStorage.getItem('roll');
  }

  // This function runs when the button is clicked
  onToggle() {
   // alert(';hyu')
    this.toggleSidebar.emit();
  }
  logout(){
    localStorage.removeItem('id');
    localStorage.removeItem('roll');
    localStorage.removeItem('username');
    this.r.navigate(['/login']);
  }
}
