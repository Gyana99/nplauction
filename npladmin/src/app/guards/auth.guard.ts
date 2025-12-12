import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {

    const id = localStorage.getItem('id');
    const username = localStorage.getItem('username');
    const roll = localStorage.getItem('roll');

    // Check if all required login values exist
    if (id && username && roll) {
      return true;  // user is allowed
    }

    // Not logged in → redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
