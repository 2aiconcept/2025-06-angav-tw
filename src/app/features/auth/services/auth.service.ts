import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // isLoggedIn = true;
  // logIn() {
  //   this.isLoggedIn = true;
  // }
  // logOut() {
  //   this.isLoggedIn = false;
  // }
  // Signal au lieu de propriété simple
  private router = inject(Router);
  isLoggedIn = signal(true);

  logIn() {
    this.isLoggedIn.set(true);
  }

  logOut() {
    this.isLoggedIn.set(false);
    this.router.navigate(['signin']);
  }
}
