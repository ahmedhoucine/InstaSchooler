import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Connexion réussie', response);
        this.authService.saveToken(response.token); // Stocke le token dans localStorage
        this.router.navigate(['/teacher-space/dashboards']);
      },
      error: (error) => {
        console.error('Erreur de connexion', error);
        this.errorMessage = 'Email ou mot de passe incorrect.';
      },
    });
  }
}
