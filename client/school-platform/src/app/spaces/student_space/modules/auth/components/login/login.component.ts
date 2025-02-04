import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/spaces/student_space/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'error';
  showAlert: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.showAlert = false;

    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response) => {
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/student']);
      },
      (error) => {
        this.alertMessage = 'Login failed. Please check your credentials.';
        this.alertType = 'error';
        setTimeout(() => {
          this.showAlert = true;
        }, 0);

        console.error(error);
      }
    );
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
