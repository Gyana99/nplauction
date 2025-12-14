import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EncryptionService } from '../services/encryption.service';
EncryptionService
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router ,private en:EncryptionService) {}

  canActivate(): boolean {
    const id = this.en.decrypt(localStorage.getItem('id'));
   const  username = this.en.decrypt(localStorage.getItem('username'));
   const roll = this.en.decrypt(localStorage.getItem('roll'));
    // const id = localStorage.getItem('id');
    // const username = localStorage.getItem('username');
    // const roll = localStorage.getItem('roll');

    // Check if all required login values exist
    if (id && username && roll) {
      return true;  // user is allowed
    }

    // Not logged in → redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
