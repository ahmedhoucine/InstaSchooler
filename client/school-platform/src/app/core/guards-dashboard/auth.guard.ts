import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../spaces/dashboard/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardDashboard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    console.log('AuthGuardDashboard - Is Authenticated:', isAuthenticated);
    if (!isAuthenticated) {
      console.log('AuthGuardDashboard - Redirecting to /auth/login');
      this.router.navigate(['/auth/login']);
    }
    return isAuthenticated;
  }

}
