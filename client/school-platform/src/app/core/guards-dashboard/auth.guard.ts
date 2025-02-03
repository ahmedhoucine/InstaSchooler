import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../spaces/dashboard/services/auth.service';
import { HeaderStateService } from '../../spaces/dashboard/services/header-state.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,private headerState: HeaderStateService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      this.headerState.setLoginViewState(false);
      return true;
    } else {
      this.router.navigate(['dashboard/auth/login']);
      return false;
    }
  }
}
