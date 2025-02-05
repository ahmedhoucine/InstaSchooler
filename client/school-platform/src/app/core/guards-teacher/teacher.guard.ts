import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../spaces/teacher_space/services/auth.service'; // Service d'authentification, à ajuster selon ta structure

@Injectable({
  providedIn: 'root',
})
export class TeacherGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Vérifie si l'utilisateur est authentifié
    if (this.authService.isAuthenticated()) {
      return true; // Autorise l'accès à la route
    } else {
      this.router.navigate(['/join']); // Redirige vers la page de connexion
      return false; // Bloque l'accès
    }
  }
}