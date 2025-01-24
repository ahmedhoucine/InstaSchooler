import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './dashboard-login.component.html',
  styleUrls: ['./dashboard-login.component.scss'],
})
export class DashboardLoginComponent {
  username = '';
  password = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.username && this.password) {
      console.log('Username:', this.username);
      console.log('Password:', this.password);

      // Call the login method in the AuthService
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
          if (response && response.token) {
            // Store the token in localStorage
            localStorage.setItem('access_token', response.token);
            // Redirect to the dashboard overview page
            this.router.navigate(['/dashboard/overview']);
          }
        },
        (error) => {
          console.error('Login failed', error);
          // Set the error message to be displayed
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please enter both username and password.';
    }
  }

  // Clear the error message when user starts typing
  onInputChange() {
    this.errorMessage = '';
  }
}
