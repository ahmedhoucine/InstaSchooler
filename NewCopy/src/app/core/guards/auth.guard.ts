import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service'; // Import AuthService

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    if (this.authService.isTokenValid()) {
      return true;  // Token is valid
    } else {
      console.log('No valid token, redirecting to login.');
      this.router.navigate(['/login']); // Redirect to login page if token is invalid or not present
      return false;
    }
  }
}
