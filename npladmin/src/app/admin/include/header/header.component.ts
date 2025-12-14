import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/services/encryption.service';

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
  constructor(private r:Router,private en:EncryptionService) {
    this.id = this.en.decrypt(localStorage.getItem('id'));
    this.user = this.en.decrypt(localStorage.getItem('username'));
    this.roll = this.en.decrypt(localStorage.getItem('roll'));
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
