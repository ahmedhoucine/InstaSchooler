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
  errorMessage: string = '';  // Declare errorMessage property
  showAlert: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.showAlert = false; // Hide previous alert

    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response) => {
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/student']);
      },
      (error) => {
        // Show error message on login failure
        this.errorMessage = 'Login failed. Please check your credentials.';
        this.showAlert = true; // Display the error message
        console.error(error);
      }
    );
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
